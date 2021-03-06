import { petsData } from './../properties/pets/petsData';
import { UserData } from '../types';

/**
 * check if user has active pet, if he has then return class which is responsible for marking pet wrapper
 * @param currentPetName - name of active pet  
 * @param petName - name of pet that you want to check is equal to name of active pet
 */
 const checkCurrentPet = (currentPetName: string, petName: string) : string => {
    return currentPetName === petName ? 'pets__current' : '';
}

/**
 * get html code for pets section
 * @param user - data about current logged user
 */
export const getPetsHTMLCode = (user: UserData): string => {
  return `
  <section class='pets background'>

  <div class='pets__userGoldWrapper'>

      <div class='pets__userGold'>
          <img src='./images/coin.png' class='pets__userGoldIcon' alt='coin' />
          <strong class='pets__userGoldAmount'>${user.gold}</strong>
      </div>
      <div class='pets__goldSubtract disabled'></div>

  </div>

  <div class='pets__wrapper'>

      ${petsData.map(el => `
      <div class='pets__item ${user.pet !== null && checkCurrentPet(user.pet.name, el.name)}'
          data-pet-name=${el.name}>

          <div class='pets__imgWrapper'>
              <img class='pets__img' src=${el.imgSrc} alt=${el.name} />
          </div>

          <div class='pets__label'>

              <h2 class='pets__name pets__name-${el.name}'>${el.name}</h2>
              <div class='pets__cost'>
                  <img src='./images/coin.png' alt='coin' />
                  <strong>${Math.floor(el.initialCost * user.guardPayout)}</strong>
              </div>

              <ul class='pets__benefits'>
                  ${el.properties.travelTime !== null ? `<li class='pets__benefitsItem'>-${el.properties.travelTime}%
                      of travel time </li>` : ''}
                  ${el.properties.defence !== null ? `<li class='pets__benefitsItem'>+${el.properties.defence}% to
                      Defence </li>` : ``}
                  ${el.properties.physicalEndurance !== null ? ` <li class='pets__benefitsItem'>
                      +${el.properties.physicalEndurance}% to Physical endurance </li>` : ``}
                  ${el.properties.strength !== null ? `<li class='pets__benefitsItem'>+${el.properties.strength}% to
                      Strength </li>` : ``}
                  ${el.properties.luck !== null ? ` <li class='pets__benefitsItem'>+${el.properties.luck}% to Luck
                  </li>` : ``}
              </ul>

              <div class='pets__countdownWrapper disabled' data-pet-countdown-id=${el.id}>12h 13m 12s left </div>

              <div class='pets__buy'><button class='
    ${user.gold >= Math.floor(el.initialCost * user.guardPayout) ? ' pets__buy-afford' : ' pets__buy-notAfford' } ' data-pet-name=${el.name}>
    
    Rent for 7 days
    </button>
  </div>

   </div>

   </div>

 `)}
 </div>   

</section>
    `;
}

