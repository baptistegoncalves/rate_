export default function Description() {
  return (
    <>
      <section className="flex justify-center text-white w-3/5 m-auto">
        <div className="w-full">
          <h2 className="mb-4 font-bold">
            3. Choisis ton titre, ta description et la couleur
          </h2>
          <div className="bg-[#212126] h-[150px] flex rounded-[13px]">
            <div className="flex-grow flex flex-col justify-start">
              <input
                type="text"
                placeholder="Titre"
                className="bg-transparent font-bold w-full mb-2 p-2"
              />
              <input
                type="text"
                placeholder="Description"
                className="bg-transparent font-bold w-full flex-grow p-2"
              />
            </div>
            <div>
              <div className="bg-[#4E6B47] h-1/2 w-[30px] rounded-tr-[13px]"></div>
              <div className="bg-[#6C81B6] h-1/2 w-[30px] rounded-br-[13px]"></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
