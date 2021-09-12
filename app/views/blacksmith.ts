import { ShopItem } from '../types';
import { chestplatesData } from '../properties/shop/chestplates';
import { helmetsData } from '../properties/shop/helmets';
import { glovesData } from '../properties/shop/gloves';
import { weaponsData } from '../properties/shop/weapons';
import { shieldsData } from '../properties/shop/shields';
import { getRandomShopItem } from '../functions/getRandomShopItem';
export class Blacksmith {

   private root: HTMLElement
   private test: any
   private dom: {
      marketSlots: NodeListOf<Element> | null,
      itemInfoBox: HTMLElement | null
   }
   constructor() {
      this.root = document.getElementById("game__view"),
      this.test = true
      this.dom = {
         marketSlots: document.querySelectorAll("#market_slots .market__slot"),
         itemInfoBox: document.querySelector('#blacksmith_item_info')
      }
      this.init();
   }

   async render() {
      this.root.innerHTML = `<section class='blacksmith transparent'>
           <div class='blacksmith__item'>
                <div class='profile__equipment'>
                   <div class='profile__equipmentItem profile__equipmentItem-helmet'> 
                      <img src='/images/profile_equipment_helmet.png' class="profile__equipmentIcon">
                   </div>
                   <div class='profile__equipmentItem profile__equipmentItem-armor'> 
                      <img src='/images/profile_equipment_armor.png' class="profile__equipmentIcon">
                   </div>
                   <div class='profile__equipmentItem profile__equipmentItem-gloves'> 
                      <img src='/images/profile_equipment_gloves.png' class="profile__equipmentIcon">
                   </div>
                   <div class='profile__equipmentItem profile__equipmentItem-weapon'> 
                      <img src='/images/profile_equipment_weapon.png' class="profile__equipmentIcon">
                   </div>
                   <div class='profile__equipmentItem profile__equipmentItem-shield'> 
                      <img src='/images/profile_equipment_shield.png' class="profile__equipmentIcon">
                   </div>
                   <div class='profile__equipmentItem profile__equipmentItem-special'> 
                      <img src='/images/profile_equipment_special.png' class="profile__equipmentIcon">
                   </div>
                   <div class='profile__portrait'> </div>
                   <div class='profile__info'>
                      <div class='profile__level'>  </div>
                      <strong class='profile__nickname'>nickname</strong>
                   </div>
                </div>           
           
            <div class='profile__backpack'>
                <div class='profile__backpackRow'>
                   <div class='profile__backpackItem'> </div>
                   <div class='profile__backpackItem'> </div>
                   <div class='profile__backpackItem'> </div>
                   <div class='profile__backpackItem'> </div>
                   <div class='profile__backpackItem'> </div>
                </div>
                <div class='profile__backpackRow'>
                   <div class='profile__backpackItem'> </div>
                   <div class='profile__backpackItem'> </div>
                   <div class='profile__backpackItem'> </div>
                   <div class='profile__backpackItem'> </div>
                   <div class='profile__backpackItem'> </div>
                </div>
           </div>
    
    
           
           </div>

              <div class='blacksmith__item market__shop'> 
               <div class='market__characterWrapper'>

            
                 <div class='market__itemInfoWrapper'> 
                     <div class='market__itemInfo' id='blacksmith_item_info'>
                 <h3 class='market__itemTitle market__itemTitle-legendary'>blood infused quickblade</h3>
                 <strong class='market__itemRarity market__itemRarity-legendary'>Common</strong>
                 <p class='market__itemDsc'>'lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem rloerm lorem lorem lorelo mrelo lorem lorem lorem ,lorem'</p>
                 <table class='market__itemStats'>
                   <tbody>
                     <tr>
                       <td>Strength</td>
                       <td>20 <strong>/+10</td>
                     </tr>
                     <tr>
                       <td>Physical endurance</td>
                       <td>20</td>
                     </tr>
                     <tr>
                       <td>Defence</td>
                       <td>20</td>
                     </tr>
                     <tr>
                       <td>Luck</td>
                       <td>20</td>
                     </tr>
                   </tbody>
                 </table>
             
                 <div class='market__itemPriceWrapper'>
                   <img class='market__itemPriceIcon' src='./images/coin.png' alt='coin'/>
                   <strong class='market__itemPrice'>2000</strong>
                 </div>

               </div>
                 </div>  


                     
                
                     <img class='market__characterImg' src='./images/blacksmith.png' alt='blacksmith'/>   
         
                         
                </div>
    
                <div class='market__itemsList' id='market_slots'>
                   <div class='market__shopRow'> 
                      <div class='market__shopFrame blacksmith__frame'>
                        <div class='market__slot'>
                            <img src='./images/shop/weapons/dire_steel_crusader.png'/> 
                        </div>  
                      </div>
                      <div class='market__shopFrame blacksmith__frame'>
                        <div class='market__slot'>
                       
                        </div> 
                      </div>
                      <div class='market__shopFrame blacksmith__frame'>
                        <div class='market__slot'>
                        
                        </div> 
                      </div>
                   </div>

                <div class='market__shopRow'> 
                   <div class='market__shopFrame blacksmith__frame'>
                        <div class='market__slot'>
                          
                        </div> 
                   </div>
                   <div class='market__shopFrame blacksmith__frame'>
                        <div class='market__slot'>
                     
                        </div> 
                   </div>
                   <div class='market__shopFrame blacksmith__frame'>
                        <div class='market__slot'>
                   
                        </div> 
                   </div>
                </div>
                </div>
           
           </div>
             

    
        </section>`;
   }


   setShop() {

      /////////////////// creating shop items array /////////////////////////

      // array with shop items, base on which shop will be created
      let shopItems: ShopItem[] = []

      // pushing random equipment items

      // random helmet
      shopItems.push(getRandomShopItem(helmetsData));
      // random chest plate
      shopItems.push(getRandomShopItem(chestplatesData));
      // random gloves
      shopItems.push(getRandomShopItem(glovesData));
      // random weapon
      shopItems.push(getRandomShopItem(weaponsData));
      // random shield
      shopItems.push(getRandomShopItem(shieldsData));

      // Blacksmith shop has 6 slots, shopItems array has only 5 items, so its need to get one more random item 
      const randomItems: ShopItem[] = [];

      // random helmet
      randomItems.push(getRandomShopItem(helmetsData));
      // random chest plate
      randomItems.push(getRandomShopItem(chestplatesData));
      // random gloves
      randomItems.push(getRandomShopItem(glovesData));
      // random weapon
      randomItems.push(getRandomShopItem(weaponsData));
      // random shield
      randomItems.push(getRandomShopItem(shieldsData));

       // push last item to shopItems array
       shopItems.push(getRandomShopItem(randomItems))

       // shuffle the shopItems array
       shopItems = shopItems.sort(() => Math.random() - .5)

       console.log(this.dom.marketSlots)
       //////////////// rendering shop ////////////////////////////////
 
       this.dom.marketSlots.forEach((el, num) => {
          
          const slot = el as HTMLElement
         
         
         // slot.addEventListener('mouseover', ()=> {
         //    console.log(123)
         //    this.dom.itemInfoBox.style.display = 'block'
         // })
         // slot.addEventListener('mouseleave', ()=> {
         //    console.log(1233333)
         //   this.dom.itemInfoBox.style.display = 'none'
        
         // })
      
        slot.dataset.id = shopItems[num].id
         
         slot.innerHTML = `<img src='${shopItems[num].src}' data-itemID='${shopItems[num].id}'/>`
       });
       
   }

   
   getDOMElements() {
      this.dom = {
         marketSlots: document.querySelectorAll("#market_slots .market__slot"),
         itemInfoBox: document.querySelector('#blacksmith_item_info')
      }
   }
   initScripts() {
      this.setShop();
   }
   init() {
      this.render();
      this.getDOMElements();
      this.initScripts();
   }
}

// <a href='https://www.freepik.com/vectors/frame'>Frame vector created by upklyak - www.freepik.com</a>



// <div class='market__itemInfo' id='blacksmith_item_info'>
//                  <h3 class='market__itemTitle'>blood infused quickblade</h3>
//                  <strong class='market__itemRarity market__itemRarity-common'>Common</strong>
//                  <p class='market__itemDsc'>'lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem rloerm lorem lorem lorelo mrelo lorem lorem lorem ,lorem'</p>
//                  <table class='market__itemStats'>
//                    <tbody>
//                      <tr>
//                        <td>Strength</td>
//                        <td>20</td>
//                      </tr>
//                      <tr>
//                        <td>Physical endurance</td>
//                        <td>20</td>
//                      </tr>
//                      <tr>
//                        <td>Defence</td>
//                        <td>20</td>
//                      </tr>
//                      <tr>
//                        <td>Luck</td>
//                        <td>20</td>
//                      </tr>
//                    </tbody>
//                  </table>
             
//                  <div class='market__itemPriceWrapper'>
//                    <img class='market__itemPriceIcon' src='./images/coin.png' alt='coin'/>
//                    <strong class='market__itemPrice'>2000</strong>
//                  </div>

//                </div>