import { useState } from "react";
import { useSelector } from "react-redux";
import NHTML from "./NHTML";
import NCSS from "./NCSS";

export default function NDD() {
  const { duration, keyFrames, animationFunction } = useSelector(
    (state) => state.custom
  );
  const animationName = useSelector(
    (state) =>
      state.animations.custom.animationNames[state.animations.custom.curIndex]
  );

  const [tab, setTab] = useState("html");

  function handleTab(tab) {
    setTab(tab);
  }

  return (
    <>
      <div className="modal-tab-container">
        <NHTML tab={tab} handleTab={handleTab} />
        <NCSS tab={tab} handleTab={handleTab} />
      </div>
      <div className="modal-code-container">
        {/* Numbers */}
        <div className="w-10 pt-4 pr-1 text-right bg-black/20 text-white/50 numbers">
          <p>0</p>
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
          <p>6</p>
          <p>7</p>
          <p>8</p>
          <p>9</p>
          <p>10</p>
          <p>11</p>
          <p>12</p>
          <p>13</p>
          <p>14</p>
          <p>15</p>
          <p>16</p>
          <p>17</p>
          <p>18</p>
          <p>19</p>
          <p>20</p>
          <p>21</p>
          <p>22</p>
        </div>

        {tab === "html" && (
          <div className="pt-4 modal-code">
            <p>{"<div class='parent-container'>"}</p>
            <p className="ml-3">{"<div class='animation-container'>"}</p>
            <p className="ml-6">{"<p>Your Content</p>"}</p>
            <p className="ml-3">{"</div>"}</p>

            <p>{"</div>"}</p>
          </div>
        )}
      </div>
    </>
  );
}
