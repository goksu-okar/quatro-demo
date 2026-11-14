import { Avatar, Button, Anchor } from "@mantine/core";
import "./output.css";
import {
  capitalizeFirstLetter,
  convertDate,
  createTodaysDate,
  futureDate7,
  formatDueDate,
} from "../../utils/helpers.js";
import myAvatarPerson from "../../pictures/black-avatar.jpg";
import myAvatarBoard from "../../pictures/board-black.png";
import myAvatarPen from "../../pictures/black-pen1.png";
import blackPad from "../../pictures/black-pad.png";
import whitePad from "../../pictures/white-pad.png";
import padsTBA from "../../pictures/pads-tba.png";
import single from "../../pictures/single.png";
import thruster from "../../pictures/thruster.png";
import quad from "../../pictures/quad.png";
import fiveFin from "../../pictures/five.png";

import { useEffect, useState } from "react";
import QRCode from "qrcode";
//Windsurf Output

export default function ({ values, orderNum, customer }) {
  let name = capitalizeFirstLetter(
    customer.firstName + " " + customer.lastName
  );

  const url = `https://docs.google.com/forms/d/e/1FAIpQLSeIwTqrOx95b12xhoh4hzNCSRXaUTCTFzOGaN6FtseEyklcxg/viewform?usp=pp_url&entry.428376193=${name}&entry.1361324807=${orderNum}`;

  const [src, setSrc] = useState("");

  useEffect(() => {
    QRCode.toDataURL(url).then(setSrc);
  }, []);

  const finSetup = (setup) => {
    console.log(setup);

    if (setup === "Single") {
      setup = single;
    } else if (setup === "Thruster") {
      setup = thruster;
    } else if (setup === "Quad") {
      setup = quad;
    } else if (setup === "Five Fin") {
      setup = fiveFin;
    }

    return <img className="fin-image" src={setup} />;
  };

  return (
    <>
      <div className="outer-box">
        <div className="title-box">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "57%",
            }}
          >
            <div className="order-type-heading">
              <div className="order-title">
                {capitalizeFirstLetter(values.orderType)}
              </div>
            </div>
            {values.priority && (
              <div
                style={{
                  backgroundColor: values.priority.toLowerCase(),
                  width: "125px",
                  height: "125px",
                  borderRadius: "50%",
                }}
              ></div>
            )}
          </div>
          <div className="right-box-top">
            {values.createdAt ? (
              <div className="order-date">
                <span>Order Created</span>
                {convertDate(values.createdAt)}
              </div>
            ) : (
              <div className="order-date">
                <span>Order Created</span>
                {createTodaysDate()}
              </div>
            )}
            <div>
              <img className="qr-code" src={src} />
            </div>
          </div>
        </div>

        <div className="wide-box-1">
          <div className="row">
            <div className="dataa">{name}</div>
            <div className="dataa">{orderNum}</div>
            <div className="dataa">&nbsp;</div>
            <div className="dataa">&nbsp;</div>
          </div>
          <div className="row">
            <div className="dataa">{values.construction}</div>
            <div className="dataa">{values.finSetup}</div>
            <div className="dataa">{capitalizeFirstLetter(values.tail)}</div>
            <div className="dataa">{values.boxType}</div>
          </div>

          <div className="row">
            <div className="dataa">
              <u>
                <span className="heading">Board Color:</span>
              </u>
              {values.boardColor}
            </div>
            <div className="dataa">
              <u>
                <span className="heading">Logo Color:</span>
              </u>
              {values.logo}
            </div>
            <div className="dataa">
              <u>
                <span className="heading">Pad Color:</span>
              </u>
              {values.pads}
            </div>
            {values.airbrush === "" ? null : (
              <div className="dataa">
                <u>
                  <span className="heading">Air Brush:</span>
                </u>
                {values.airbrush}
              </div>
            )}
          </div>

          {/* <div className='row'>
            {values.airbrush === "" ? null : <div className='dataa'>
              <u><span className='heading'>Air Brush:</span></u>
              {values.airbrush}
            </div>}
            <div className='dataa'>
              <u><span className='heading'>Finish:</span></u>
              {console.log(values.finish)}
              {values.finish}
            </div>
            <div className='dataa'>
              <u><span className='heading'>Board Weight:</span></u>
              {values.boardWeight}
            </div>
            <div className='dataa'>
              &nbsp;
            </div>
          </div> */}
        </div>

        <div className="wide-box-2">
          <div className="row">
            <div className="dataa">
              <u>
                <span className="heading">Inserts:</span>
              </u>
              {values.inserts}
            </div>
            <div className="dataa">
              <u>
                <span className="heading">Stance:</span>
              </u>
              {values.stance}
            </div>
            <div className="dataa">
              <u>
                <span className="heading">Strap Width:</span>
              </u>
              {values.strapWidth === "" ? <>&nbsp;</> : values.strapWidth}
            </div>
          </div>
          <div className="row">
            <div className="dataa">
              <u>
                <span className="heading">Volume:</span>
              </u>
              {values.volume}
            </div>
            <div className="dataa">
              <u>
                <span className="heading">Length:</span>
              </u>
              {` ${values.lengthFt}' ${values.lengthIn}`}
            </div>
            <div className="dataa">&nbsp;</div>
          </div>
        </div>

        <div className="wide-box-3">
          <div className="notes">
            <u>
              <span className="heading">Notes:</span>
            </u>
            <div>{values.notes}</div>
          </div>
          <div className="pads-fins-display-box">
            <img
              className="pad-image"
              src={
                values.pads === "Black"
                  ? blackPad
                  : values.pads === "White"
                  ? whitePad
                  : padsTBA
              }
            />

            {finSetup(values.finSetup)}
          </div>
        </div>

        <div className="wide-box-4">
          <div className="row">
            <div className="dataa">{customer.weight + " lbs"}</div>
            <div className="dataa">
              {` ${customer.heightFt}' ${customer.heightIn}`}
            </div>
            <div className="dataa">{customer.level}</div>
            <div className="dataa">
              {values.waveLocation === "" ? (
                <div>&nbsp;</div>
              ) : (
                <div>{values.waveLocation}</div>
              )}
            </div>
          </div>

          <div className="row-2">
            {customer.phone === "na" ? null : (
              <div className="dataa">
                {" "}
                <div>{customer.phone}</div>
              </div>
            )}
            {customer.email === "na" ? null : (
              <div className="dataa">
                {" "}
                <div>{customer.email}</div>
              </div>
            )}
          </div>
        </div>

        <div className="board-pic-button">
          {values.image === "" ? null : (
            <a href={values.image} target="_blank">
              Board Photo
            </a>
          )}
        </div>

        <div className="rush">
          {formatDueDate(values) ? (<div className='r-div'>DUE {formatDueDate(values)}</div>) : null}
        </div>
      </div>
    </>
  );
}
