export default function Micro({ svg, svg2 }) {
  return (
    <>
      <div className="flex gap-2 text-main-t-gray">
        <img src={svg} /> <h1>Micro library</h1>
        <img src={svg2} className="ml-auto" />
      </div>
    </>
  );
}
