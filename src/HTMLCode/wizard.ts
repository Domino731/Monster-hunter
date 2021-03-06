
import { UserData } from '../types';

/**
 * get html code for wizard section
 * @param user - data about current logged user
 */
export const getWizardHTMLCode = (user: UserData): string => {
   return `
   <section class='wizard background'>

   <div class='wizard__characterWrapper'>
       <img class='wizard__characterImg' src='./images/wizard.png' alt='wizard' />
   </div>

   <div class='wizard__descriptionWrapper'>

       <div class='wizard__description glass'>
           <h2 class='wizard__title'>try one's fortune </h2>
           <p class='wizard__text'>
               Here's the magic circle created by the legendary gods.
               It has served warriors since the beginning of the war against monsters. It has all the necessary items
               for battles with monsters. The magic circle requires a lot of mana to spin,
               the mana is renewed every midnight when one of the legendary gods gives up some of his mana.
           </p>

           <div class='wizard__countdownWrapper ${user.wizardWheelSpin && ' disabled'}'>
               <div>Next spin in</div>
               <div class='wizard__countdown'>

               </div>
           </div>

           ${user.wizardWheelSpin ?
           `<div class='wizard__actionBar'>
               <strong class='wizard__actionError'></strong>
               <button class='wizard__btn'>SPIN</button>
           </div>`
           :
           ''
           }
           
       </div>
   </div>

   <div class='spinningWheel__wrapper'>

       <div class='spinningWheel__content'>
           <div class="one" data-spinningWheel></div>
           <div class="two" data-spinningWheel>2</div>
           <div class="three" data-spinningWheel>3</div>
           <div class="four" data-spinningWheel>4</div>
           <div class="five" data-spinningWheel>5</div>
           <div class="six" data-spinningWheel>6</div>
           <div class="seven" data-spinningWheel>7</div>
           <div class="eight" data-spinningWheel>8</div>
           <div class='circle'></div>
       </div>

       <div id='wonItem_wrapper'></div>
   </div>
   <section>
     `;
}