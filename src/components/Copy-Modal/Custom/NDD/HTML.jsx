export default function HTML() {
  return (
    <>
      <p className="text-blue-500">
        {"<div class="}
        <span className="text-yellow-400">"{"parent-container"}"</span>
        {">"}
      </p>
      <p className="ml-3 text-blue-500">
        {"<div class="}
        <span className="text-yellow-400">"{"animation-container"}"</span>
        {">"}
      </p>
      <p className="ml-6 text-pink-500">{"<p>Your Content</p>"}</p>
      <p className="ml-3 text-blue-500">{"</div>"}</p>
      <p className="text-blue-500">{"</div>"}</p>
    </>
  );
}
