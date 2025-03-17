import "./index.scss";
export default function ChoiceButton({
  vector,
  heading,
  description,
  selected,
  onClick,
}: {
  vector: string;
  heading: string;
  description: string;
  selected?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <button
      type="button"
      className={`${selected ? "selected-choice-btn" : "default-choice-btn"}`}
      onClick={onClick}
    >
      <div className="flex items-center">
        <div className="vector rounded-full centred">
          <img src={vector} alt="vector" width={18} height={22} />
        </div>
        <div
          className={`flex flex-col gap-1 ${
            selected
              ? "selected-choice-btn-content"
              : "default-choice-btn-content"
          }`}
        >
          <h4
            className={`${
              selected
                ? "selected-choice-btn-heading"
                : "default-choice-btn-heading"
            }`}
          >
            {heading}
          </h4>
          <p
            className={`${
              selected
                ? "selected-choice-btn-description"
                : "default-choice-btn-description"
            }`}
          >
            {description}
          </p>
        </div>
      </div>
    </button>
  );
}
