export default function HTML() {
  return (
    <>
      <p className="h-full text-green-500">
        {"<div class="}
        <span className="text-blue-400">"{"parent-container"}"</span>
        {">"}
        <br />
        <span className="ml-3">{"<div class="}</span>
        <span className="text-blue-400">"{"animation-container"}"</span>

        {">"}
        <br />
        <span className="ml-6">{"<p>"}</span>
        <span className="text-[#D4E6E1]">Your Content</span>
        {"</p>"}
        <br />
        <span className="ml-3">{"</div>"}</span>
        <br />
        {"</div>"}
      </p>
    </>
  );
}
