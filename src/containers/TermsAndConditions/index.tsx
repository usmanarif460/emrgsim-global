import { useEffect, useRef, useState } from "react";
import Passport from "../Passport";
import "./index.scss";
import Header from "../HeaderSmall";
import PageIndex from "../../components/PageIndex";

type Props = {
  next: () => void;
};

type CanvasPosition = {
  x: number;
  y: number;
};

const TermsAndConditions = (props: Props) => {
  const canvas = useRef<HTMLCanvasElement | null>(null);
  const [currentPosition, setCurrentPosition] = useState<CanvasPosition | null>(
    null
  );
  const [lastPos, setLastPos] = useState<CanvasPosition | null>(null);
  const [drawing, setDrawing] = useState<boolean>(false);
  const requestRef = useRef<number>(0);

  function preventTouch(ev: TouchEvent) {
    if (canvas.current && ev.target === canvas.current) {
      ev.preventDefault();
    }
  }

  function preventMouse(ev: MouseEvent) {
    if (canvas.current && ev.target === canvas.current) {
      ev.preventDefault();
    }
  }

  useEffect(() => {
    if (!canvas.current) return;

    canvas.current.addEventListener("touchstart", preventTouch, {
      passive: false,
    });
    canvas.current.addEventListener("touchend", preventTouch, {
      passive: false,
    });
    canvas.current.addEventListener("touchmove", preventTouch, {
      passive: false,
    });
    canvas.current.addEventListener("mousedown", preventMouse, {
      passive: false,
    });
    canvas.current.addEventListener("mouseup", preventMouse, {
      passive: false,
    });
    canvas.current.addEventListener("mousemove", preventMouse, {
      passive: false,
    });

    const ctx = canvas.current.getContext("2d");
    if (ctx) {
      ctx.strokeStyle = "#222222";
      ctx.lineWidth = 4;
    }

    return () => {
      if (!canvas.current) return;
      canvas.current.removeEventListener("touchstart", preventTouch);
      canvas.current.removeEventListener("touchend", preventTouch);
      canvas.current.removeEventListener("touchmove", preventTouch);
      canvas.current.removeEventListener("mousedown", preventMouse);
      canvas.current.removeEventListener("mouseup", preventMouse);
      canvas.current.removeEventListener("mousemove", preventMouse);
    };
  }, []);

  useEffect(() => {
    if (!drawing || !canvas.current || !currentPosition || !lastPos) {
      if (drawing && currentPosition && !lastPos) {
        setLastPos(currentPosition);
      }
      return;
    }
    renderCanvas(canvas.current, currentPosition, lastPos);
    setLastPos({ ...currentPosition });
  }, [currentPosition]);

  function getCanvasPoint(pos: CanvasPosition | null): CanvasPosition | null {
    if (!pos || !canvas.current) return null;
    const rect = canvas.current.getBoundingClientRect();
    return { x: pos.x - rect.left, y: pos.y - rect.top };
  }

  function renderCanvas(
    canvas: HTMLCanvasElement,
    currentPosition: CanvasPosition,
    lastPos: CanvasPosition
  ) {
    const ctx = canvas.getContext("2d");
    if (!ctx || !drawing) return;
    ctx.beginPath();
    ctx.moveTo(lastPos.x, lastPos.y);
    ctx.lineTo(currentPosition.x, currentPosition.y);
    ctx.stroke();
  }

  function clearCanvas(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  function startDrawing(pos: CanvasPosition | null) {
    setDrawing(true);
    if (pos) setCurrentPosition(pos);
  }

  function stopDrawing() {
    setDrawing(false);
    setCurrentPosition(null);
    setLastPos(null);
  }

  function draw(pos: CanvasPosition | null) {
    if (pos) setCurrentPosition(pos);
  }

  function mousePosition(
    ev: React.MouseEvent<HTMLCanvasElement>
  ): CanvasPosition {
    return { x: ev.clientX, y: ev.clientY };
  }

  function touchPosition(
    ev: React.TouchEvent<HTMLCanvasElement>
  ): CanvasPosition | null {
    if (ev.touches.length) {
      return { x: ev.touches[0].pageX, y: ev.touches[0].pageY };
    }
    return null;
  }

  return (
    <div className="TermsAndConditions">
      <Header />
      <div className="TermsAndConditions-content">
        <h1 className="heading">Terms And Conditions</h1>
        <div className="description flex flex-col gap-10 terms">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <p>
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur.
          </p>
        </div>
      </div>

      <div className="signature">
        <div className="canvas-area">
          <canvas
            ref={canvas}
            onMouseDown={(ev) =>
              startDrawing(getCanvasPoint(mousePosition(ev)))
            }
            onMouseUp={stopDrawing}
            onMouseMove={(ev) => draw(getCanvasPoint(mousePosition(ev)))}
            onTouchStart={(ev) =>
              startDrawing(getCanvasPoint(touchPosition(ev)))
            }
            onTouchEnd={stopDrawing}
            onTouchCancel={stopDrawing}
            onTouchMove={(ev) => draw(getCanvasPoint(touchPosition(ev)))}
          />
          <div>
            <p onClick={() => canvas.current && clearCanvas(canvas.current)}>
              Clear
            </p>
          </div>
        </div>
        <button onClick={props.next}>Accept & Sign</button>
        <p>I disagree</p>
      </div>
    </div>
  );
};

export default TermsAndConditions;
