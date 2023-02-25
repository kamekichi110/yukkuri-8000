
(()=>{
    const addDiv = (parentDiv,className,callBack = null ) => {
        const t = document.createElement("div");
        t.classList.add(className);
        if( callBack && typeof callBack === "function") callBack(t);
        parentDiv.appendChild(t);
        return t;
    }

    const createFace = () =>{
        const analog = document.getElementById("analog");
        const vp = [analog.clientWidth,analog.clientHeight];
        const chokei = Math.min(...vp);

        const analogFace = addDiv(analog,"analog-face",( t )=>{
            [t.style.height,t.style.width] = [chokei+"px",chokei+"px"];
            [t.style.top,t.style.left] = [(vp[1]-chokei) / 2 + "px",(vp[0]-chokei) / 2 + "px"];
        });

        const r60 = 360 / 60;
        const originX = analogFace.clientWidth/2;

        for( let i = 0 ; i < 60 ; i ++){
            const deg = i * r60;

            addDiv( analogFace ,i % 5 ===0 ? "analog-line1" : "analog-line2",
                ( t )=>{

                    if( i > 0 ){
                        t.style.transformOrigin = `${originX}px center`;
                        t.style.transform=`rotate(${deg}deg)`;
                    }
            });
        }

        const r12 = 360 / 12;
        const hankei = originX;
        const moziPos = hankei -30 ;
        const MathPi = Math.PI / 180;

        for( let i = 0 ; i < 12 ; i ++){
            const deg = i * r12;
            addDiv( analogFace ,"analog-text",
                ( t ) =>{
                    const mojiX = hankei + moziPos * Math.sin( deg * MathPi );
                    const mojiY = hankei - moziPos * Math.cos( deg * MathPi );
                    [t.style.top,t.style.left] = [mojiY + "px",mojiX + "px"];
                    t.innerText = i === 0 ? "12" : i.toString();
                });
        }

        addDiv( analogFace , "analog-center" );

        return analogFace;
    };

    const firstTransition = "transform 0.5s ease-out";

    const handObj = function( className,{parentDiv:parentDiv
            ,LengthPer:LengthPer,handGapPer:handGapPer,divNum:divNum}){
        const hankei = parentDiv.clientHeight / 2;
        const handLength = hankei *  LengthPer / 100;
        const handGap = hankei *  handGapPer / 100;

        const elm = addDiv( parentDiv , className);

        elm.style.height = (handLength + handGap) + "px";
        [elm.style.top,elm.style.left] =
            [ (hankei - handLength ) + "px", (hankei - elm.clientWidth/2) + "px"];
        elm.style.transformOrigin = `center ${handLength}px `;
        elm.style.transition=firstTransition;

        this.rotateText = [];
        const angle = 360 / divNum;

        for( let i = 0 ; i < divNum ; i ++){
            this.rotateText.push( `rotate(${ angle * i }deg)` );
        }
        this.elm = elm;
        this.currentValue = null;

        this.transitionFlg = true;
        this.transitionCount = 0;
    };
    handObj.prototype.moveHand=function( val ){
        if( this.currentValue === val ) return;
        if( this.transitionFlg && ++this.transitionCount > 1 ) {
            this.elm.style.transition=""; this.transitionFlg=false;
        }
        this.currentValue = val;

        this.elm.style.transform = this.rotateText[val];
    };

    window.addEventListener("DOMContentLoaded", () => {
        const analogFace  = createFace();

        const secondHand = new handObj("analog-seconds",{
            parentDiv:analogFace,
            LengthPer:85,
            handGapPer:20,
            divNum:60
        });

        const hourHand = new handObj("analog-hours",{
            parentDiv:analogFace,
            LengthPer:55,
            handGapPer:10,
            divNum:12 * 60
        });

        const minuteHand = new handObj("analog-minutes",{
            parentDiv:analogFace,
            LengthPer:80,
            handGapPer:10,
            divNum:60
        });

        setInterval(()=> {
            const date = new Date();
            secondHand.moveHand(date.getSeconds());
            hourHand.moveHand((date.getHours()%12) * 60 + date.getMinutes());
            minuteHand.moveHand(date.getMinutes());
        },1000);
    });
})();

