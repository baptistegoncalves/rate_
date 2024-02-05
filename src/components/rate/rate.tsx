import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { type CarouselApi } from "@/components/ui/carousel"
import { useToast } from '@/components/ui/use-toast';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {NavigationMenuDemo} from "@/components/Navbar/Navbar";
interface User {
  id: number;
  attributes: {
    username: string;
  };
}

interface Commentaire {
  id: number;
  attributes: {
    commentaire: string;
    user?: {
      data?: User;
    };
  };
}

interface Photo {
  id: number;
  attributes: {
    formats: {
      large: {
        url: string;
      };
    };
    commentaires?: number[]; // Ajout d'un tableau optionnel pour stocker les ID des commentaires
  };
}

export function RateDisplay() {
  const baseUrl = 'http://localhost:1337';
  const token_strapi = '1e15f41862c2d2aae9dc8842205d3d9a9703a1b6e1a063749c7db84d61c917cd3a1356d5cc0f6db9f98b39a5505b78891493af0ebe739674bb4fa2c058ea4e7c1d4ad92a5ad769b05edd996b3f88acdcad9fc100872de55b797c253e6b1fba663c414281d0e29a9d735c93540deca33cfa0cac00bb6ce8e690a66d3af8ecc669';
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [commentaires, setCommentaires] = useState<Commentaire[]>([]);
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)
  const [api, setApi] = React.useState<CarouselApi>()
  const [user, setUser] = useState<string | null>(null);
  const [idCommentaire, setIdCommentaire] = useState<number | null>(null);
  const { toast } = useToast();


  useEffect(() => {
    const fetchRate = async () => {
      const jwt = localStorage.getItem('jwt');

      try {
        const response = await fetch(`${baseUrl}/api/rates/1?populate=%2A`, {
          headers: {
            'Authorization': `Bearer ${jwt}`
          }
        });
        const data = await response.json();
        setPhotos(data.data.attributes.photo.data);
        setCommentaires(data.data.attributes.commentaires.data);
        setIdCommentaire(data.data.attributes.commentaires.data[1].id);


        console.log(data.data.attributes.commentaires.data[0].id);
        console.log(data.data.attributes.commentaires.user);
      } catch (error) {
        console.error("Erreur lors de la récupération des données: ", error);
      }
      try {
        const response = await fetch(`${baseUrl}/api/commentaires/1?populate=%2A`, {
          headers: {
            'Authorization': `Bearer ${jwt}`
          }
        });
        const data = await response.json();
        setUser(data.data.attributes.user.data.attributes.username);
      } catch (error) {
        console.error("Erreur lors de la récupération des données: ", error);
      }
    };

    fetchRate();
  }, []);
  React.useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])


  return (
    <>
    <NavigationMenuDemo />
    {/* La classe 'flex-col' dispose les éléments en colonne sur mobile et 'flex-row' les dispose en ligne sur les écrans plus grands */}
    <div className="flex flex-col lg:flex-row h-screen bg-black">
      
      {/* La section des commentaires sera au-dessus de l'image sur les écrans mobiles et à gauche sur les écrans plus grands */}
      <div className="hidden lg:block lg:w-1/3 w-full p-4 lg:mt-0 lg:mr-12">
        {commentaires.length > 0 ? (
          commentaires.map((commentaire) => (
            <Card key={commentaire.id} className="mb-4 bg-white">
              <CardHeader>
                <CardTitle>{user || 'Anonyme'}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{commentaire.attributes.commentaire}</CardDescription>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-white">Pas de commentaires.</p>
        )}
      </div>

        {/* Section de l'image au centre avec carousel */}
        {/* Utilisation de 'flex-grow' et 'flex-shrink' pour maintenir les proportions */}
        <div className="w-full lg:w-1/3 flex flex-col items-center">
          <div className="flex w-full p-2">
            {Array.from({ length: photos.length }).map((_, index) => (
              <div
                key={index}
                className={`h-1 ${index === current - 1 ? 'bg-white' : 'bg-gray-500'} `}
                style={{ width: `${100 / photos.length}%`, transition: 'background-color 0.3s ease' }}
              />
            ))}
          </div>
          <div className="py-2 text-center text-sm text-muted-foreground text-white">
            Slide {current} of {photos.length}
          </div>
          <Carousel className="w-full self-end" setApi={setApi} >
            <CarouselContent>
              {photos.map((photo, index) => (
                <CarouselItem key={index}>
                  <div className="h-full w-full flex justify-center mt-2 relative">
                    <img src={`${baseUrl}${photo.attributes.formats.large.url}`} alt={`Image ${index}`} className="max-w-full h-auto object-cover" />
                    <span className="text-4xl font-semibold">{index + 1}</span>
                    <div className="absolute bottom-0 left-0 right-0 flex justify-center p-2">
                      {[1, 2, 3, 4, 5].map((num) => (
                        <Button key={num} className="p-0 m-4 bg-transparent">
                          <Image
                            src={`/Rate_boutton_${num}.svg`}
                            width={90}
                            height={120}
                            alt={`bouton ${num}`}
                          />
                        </Button>
                      ))}
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className='bg-white'/>
            <CarouselNext className='bg-white'/>
          </Carousel>

        </div>

        {/* Espace vide à droite */}
        <div className="hidden lg:block lg:w-1/3">
          {/* Contenu futur ou laissé vide */}
        </div>
      </div>
    </>
  );
}