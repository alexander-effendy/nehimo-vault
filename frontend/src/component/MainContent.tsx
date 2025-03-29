import { LuLibraryBig } from "react-icons/lu";

const MainContent = () => {
  return (
    <section 
      // style={{
      //   background: "linear-gradient(to bottom, #1DB954 0%, #101010 50%, #101010 100%)"
      // }}
      className="flex flex-col bg-[#101010] absolute top-[40px] left-[252px] h-[680px] w-[671px] rounded-[10px]"
    >
      {/* HEADER */}
      <section
        style={{
          background: "linear-gradient(to bottom, #9168a5 0%, #6f507f 40%, #503958 100%)"
        }}
        className="w-full h-[210px] rounded-t-[10px]"
      >


      </section>

      {/* LIST */}
      <section
        style={{
          background: "linear-gradient(to bottom, #3b2a43 0%, #101010 40%, #101010 100%)"
        }}
        className="w-full h-[470px] rounded-b-[10px]"
      >

      </section>
    </section>
  );
};

export default MainContent;
