
import { ShopItem } from '../types';

/**
 * get html code for potion label
 * @param item - data about potion needed to create label of this potion
 * @param classNumber - number needed to add appropriate class which is responsible for displaying 
 */
export const getPotionLabel = (item: ShopItem, classNumber: 1 | 2) : string => {
    return `
      <div class=' profile__itemSpecs potion__label potion__label-${classNumber}'>
      <h3 class='market__itemTitle white  ${item.rarity === 'common' ? 'market__itemTitle-common' : 'market__itemTitle-legendary'}'>
                 
      ${item.name}
   
      </h3>
   
      <strong class='market__itemRarity itemRarity market__itemRarity-legendary'>Legendary</strong>
      ${item.description !== undefined ? ` <p class='market__itemDsc white'>'${item.description}' </p>` : ''}
      <table class='market__itemStats itemStats'>
        <tbody>


        ${item.properties.strength !== null ? `<tr>
            <td>Strength</td>
            <td><strong class='better'> + ${item.properties.strength}%</strong></td>
          </tr>` : ''}
      
           

         ${item.properties.physicalEndurance !== null ?
              `<tr>
             <td>Physical endurance</td>
             <td><strong class='better'> + ${item.properties.physicalEndurance}%</strong></td>
            </tr>`
              : ``}   
         
          ${item.properties.defence !== null ? ` 
          <tr>
            <td>Defence</td>
            <td><strong class='better'> + ${item.properties.defence}%</strong></td>
          </tr>`
              : ``}
          
          ${item.properties.luck !== null ? `
          <tr>
            <td>Luck</td>
            <td><strong class='better'> + ${item.properties.luck}%</strong></td>
          </tr>
          `
              : ``}
        </tbody>
      </table>
      </div>
    `
}