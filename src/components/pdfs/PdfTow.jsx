import './output.css';
import SheetHeader from './SheetHeader';
import { formatDueDate } from "../../utils/helpers.js";
import myAvatarBoard from '../../pictures/board-black.png';
import myAvatarPen from '../../pictures/black-pen1.png';
//tow output

export default function PdfTow({ values, orderNum, customer }) {


  return (
    <>
      <div className='outer-box'>

        <SheetHeader values={values} orderNum={orderNum} customer={customer} />

        <div className='sheet-body'>
          <div className='board-spec-box'>
             {/* Board Heading */}
             <div className='board-avatar-info'>
              <div className='logo-info'>
                <div className='sheet-board-icon'><img src={myAvatarBoard} alt='' /></div>
                <span>Board Specs</span>
              </div>
              {values.image === '' ? null : <a href={values.image} target="_blank">Board Photo</a>}
            </div>

            <div className='info-in-box'>
              {/* First Box */}
              <div className='general-info'>
                <div className='one-data'>
                  <span>Construction</span>
                  {values.construction}
                </div>
                <div className='one-data'>
                  <span>Blank</span>
                  {values.blank}
                </div>
                <div className='one-data'>
                  <span>Tail</span>
                  {values.tail}
                </div>
                <div className='one-data'>
                  <span>Board Weight</span>
                  {values.boardWeight === '' ? <>&nbsp;</> : values.boardWeight}
                </div>
              </div>

              {/* Second Box */}
              <div className='general-info'>
                <div className='one-data'>
                  <span>Length</span>
                  {` ${values.lengthFt}' ${values.lengthIn}`}
                </div>
                <div className='one-data'>
                  <span>Width</span>
                  {values.width}
                </div>
                <div className='one-data'>
                  <span>Thickness</span>
                  {values.thickness}
                </div>
                <div className='one-data'>
                  <span>Volume</span>
                  {values.volume}
                </div>
              </div>

              {/* Third Box */}
              <div className='general-info'>
                <div className='one-data'>
                  <span>Fin Setup</span>
                  {values.finSetup}
                </div>
                <div className='one-data'>
                  <span>Box Type</span>
                  {values.boxType}
                </div>
                <div className='one-data'>
                  <span>Box Color</span>
                  {values.boxColor}
                </div>
                <div className='one-data'>
                  <span>Board Color</span>
                  {values.boardColor === "" ? <>&nbsp;</> : values.boardColor}
                </div>
                <div className='one-data'>
                  <span>Logo Color</span>
                  {values.logo === "" ? <>&nbsp;</> : values.logo}
                </div>
              </div>

              {/* Fourth Box */}
              <div className='general-info'>
                
                <div className='one-data'>
                  <span>Inserts</span>
                  {values.inserts}
                </div>
                <div className='one-data'>
                <span>Strap Width</span>
                  {values.strapWidth}
                </div>
                <div className='one-data'>
                  <span>Rear Strap</span>
                  {values.rearStrap}
                </div>
                <div className='one-data'>
                  <span>Stance</span>
                  {values.stance === "" ? <>&nbsp;</> : values.stance}
                </div>
              </div>

              {/* Fifth Box */}
              <div className='general-info'>
                <div className='one-data'>
                  <span>Pad</span>
                  {values.pads}
                </div>
                <div className='one-data'>
                  <span>Leash Plug</span>
                  {values.leash}
                </div>
                <div className='one-data'>
                <span>Airbrush</span>
                  {values.airbrush === '' ? <>&nbsp;</> : values.airbrush}
                </div>
              </div>
            </div>

            {/* Notes */}
            <div className='sheet-notes'>
              <img className='sheet-notes-icon' src={myAvatarPen} alt='' />
              <span>Notes:</span>
              <div className='sheet-notes-text'>{values.notes}</div>
            </div>

            <div className='rush'>
              {formatDueDate(values) ? (<div className='r-div'>DUE {formatDueDate(values)}</div>) : null}
            </div>

          </div>
        </div>    
      </div>
    </>
  );
}