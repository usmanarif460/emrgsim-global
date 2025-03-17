import { useState, useEffect, useRef } from "react";

import "./index.scss";

import { international } from "../../language";
import common from "../../language/english/common.json";

type Props = {
  setVerificationNumber: (num: number) => void;
  enableBack: () => void;
};

const Verification = (props: Props) => {
  const inputs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  function toValue(
    index: number,
    valueStr: string,
    verification: Array<number | string>
  ): Array<number | string> {
    let v = [...verification];
    const val = parseInt(valueStr);
    v[index] = val;
    if (Number.isNaN(val) || val < 0 || val > 9) {
      v[index] = "";
    }
    return v;
  }

  function isValid(verification: Array<number | string>): boolean {
    return verification.findIndex((val) => val === "") === -1;
  }

  function getFirstInvalidInput(verification: Array<number | string>): number {
    return verification.findIndex((val) => val === "");
  }

  // 10s are invalid because the verification number will be 6 digits positive and 1 digit per input
  const [verification, setVerification] = useState<Array<number | string>>([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = international(common.EmrgMobile);
    const input = inputs[0];
    if (input) {
      input.current?.focus();
    }
  }, []);

  useEffect(() => {
    if (isValid(verification)) {
      return;
    }
    const input = inputs[getFirstInvalidInput(verification)];
    input?.current?.focus();
  }, [verification]);

  return (
    <div className="Verification">
      <h2>Identity Verification</h2>
      <div className="verification-description">
        <h4>
          A verification code was sent to your <br /> email. Enter your OTP code
          below
        </h4>
      </div>
      <form
        onSubmit={(ev) => {
          props.setVerificationNumber(parseInt(verification.join("")));
          ev.preventDefault();
        }}
      >
        <div className="verification-area">
          {inputs.map((ref, i) => {
            const index = i;
            return (
              <input
                key={i.toString()}
                ref={ref}
                type="number"
                maxLength={1}
                onChange={(ev) => {
                  const val = parseInt(ev.target.value.trim());
                  if (
                    (ev.target.value !== "" && Number.isNaN(val)) ||
                    val < 0 ||
                    val > 9
                  ) {
                    return;
                  }
                  setVerification(
                    toValue(index, ev.target.value.trim(), verification)
                  );
                }}
                onFocus={() => {
                  const invalid = getFirstInvalidInput(verification);
                  if (invalid !== -1) {
                    inputs[invalid]?.current?.focus();
                  }
                }}
                onKeyDown={(ev) => {
                  if (index === 0) {
                    return;
                  }
                  if (ev.key === "Delete" || ev.key === "Backspace") {
                    let v = [...verification];
                    for (let i = index - 1; i < inputs.length; i++) {
                      v[i] = "";
                    }
                    setVerification(v);
                  }
                }}
                value={verification[index]}
              />
            );
          })}
        </div>
        <div className="verification-button">
          <button
            type="submit"
            disabled={!isValid(verification)}
            className="invert"
          >
            Verify
          </button>
        </div>
        <div className="verification-code-resend">
          <h3>
            Didn’t receive a code? <b>Resend</b>
          </h3>
        </div>
      </form>
    </div>
  );
};

export default Verification;
