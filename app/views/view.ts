import { UserData, ShopItem, FullUserStats, SearchedUserData } from '../types';
import { db, auth } from '../firebase/index'
import { potionsData } from '../properties/shop/potions';
import { getBlacksmithItems } from '../functions/getBlacksmithItems';
import { updateUserData } from '../firebase/operations';
import { getBlacksmithPicks } from '../functions/getBlacksmithPicks';
import { getRandomShopItem } from '../functions/getRandomShopItem';
import { allBlacksmithMarketItems } from '../properties/shop/allMarketItems';
import { getRandomMissions } from '../functions/missionGenerator';
import { monstersData } from '../properties/missions/monsters';
import { getFullUserStats } from '../functions/getFullUserStats';

export class View {
   protected userData: UserData | null
   protected root: HTMLElement;
   protected userStats: FullUserStats;
   protected userFriends: SearchedUserData[];
   protected loadingContainer: HTMLElement;
   protected loadingMonster: HTMLImageElement;
   protected mobileNav: HTMLElement
   constructor() {
      this.mobileNav = document.querySelector('.mobileNav__content')
      this.userData = null
      this.userFriends = []
      this.userStats = {
         strength: 0,
         damage: 0,
         physicalEndurance: 0,
         health: 0,
         defence: 0,
         damageReduce: 0,
         luck: 0,
         critical: 0
      }
      this.root = document.getElementById("game__view")
      this.loadingContainer = document.querySelector('.loading')
      this.loadingMonster = document.querySelector('.loading__monster')
      this.init();
   }

   // check if pet rent time has ended or if potions ended
   checkPetAndPotions(){
      const today : Date = new Date;
       if(this.userData.pet !== null){
         if(this.userData.pet.rentEnd.getTime() <= today.getTime()){
            this.userData.pet = null;
            updateUserData(this.userData);
         } 
       }
       if(this.userData.potions.first !== null){
          if(this.userData.potions.first.end.getTime() <= today.getTime()){
             this.userData.potions.first = null;
             updateUserData(this.userData);
          }
       }
       if(this.userData.potions.second !== null){
         if(this.userData.potions.second.end.getTime() <= today.getTime()){
            this.userData.potions.second = null;
            updateUserData(this.userData);
         }
      }
   }
   // function that will set statistics based on equipment, potions and pet
   setHeroStats() {
    this.userStats = getFullUserStats(this.userData)
   }

   // method responsbile for fetching user data, and also this is real time data lisener
   async getUserData() {

      const userId: string = auth.currentUser.uid
      await db.collection("users").where("__name__", "==", userId)
         .get()
         .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
               // doc.data() is never undefined for query doc snapshots
               this.userData = doc.data() as UserData
               this.setHeroStats();

            });
         })

         .catch((error) => {
            console.log("Error getting documents: ", error);
         });

      // listening for data updates
      await db.collection("users").where("__name__", "==", userId)
         .onSnapshot((snapshot) => {
            snapshot.docChanges.forEach((change) => {
               if (change.type === "modified") {
                  this.userData = change.doc.data() as UserData;
                  this.onDataChange();
                  this.setHeroStats();
               }
               if (change.type === "removed") {
                  // redirect user to login page
                 // location.href = '/login.html';
               }
            });
         });
   }

   setMagicWheel() {
      // add blacksmith items
      const items: ShopItem[] = getBlacksmithItems(this.userData.rawStats, this.userData.guardPayout);
      // aslo,  user can get gold
      const gold: ShopItem = {
         type: 'gold',
         name: 'Gold',
         rarity: 'legendary',
         src: './images/gold_chest.png',
         description: `${this.userData.gold + Math.ceil(this.userData.guardPayout * 10)} gold will always comforting`,
         initialCost: 0,
         properties: {
            strength: null,
            physicalEndurance: null,
            luck: null,
            defence: null
         },
         id: ''
      }
      items.push(gold);

      // check if user have active potion
      if (this.userData.potions.first === null || this.userData.potions.second === null) {
         items.push(getRandomShopItem(potionsData))
      }
      // if user have both potions slots occupied then add random blacksmith item
      else {
         items.push(getRandomShopItem(allBlacksmithMarketItems))
      }

      // set won item
      this.userData.magicWheel = {
         items,
         wonItem: items[Math.floor(Math.random() * items.length)]
      }
   }

   dateOperations() {

      const today: Date = new Date();
      this.checkPetAndPotions();
      if (this.userData.lastVisit.getDay() !== today.getDay()) {
         // set new shop
         this.userData.shop.blacksmith = getBlacksmithItems(this.userData.rawStats, this.userData.guardPayout);
         this.userData.shopPicks.blacksmith = getBlacksmithPicks();
         // set new wizard magic wheel spin, and new spinning wheel items
         this.userData.wizardWheelSpin = true;
         this.setMagicWheel();
         // set new missions
         this.userData.availableMissions = getRandomMissions(this.userData.nextLevelAt, this.userData.guardPayout, this.userStats, this.userData.pet);
         // set last visit date
         this.userData.lastVisit = today;
         // reset mission willingness
         this.userData.missionWillingness = 100;
           updateUserData(this.userData);
      }
      this.userData.shop.blacksmith = getBlacksmithItems(this.userData.rawStats, this.userData.guardPayout);
      this.userData.shopPicks.blacksmith = getBlacksmithPicks();
      updateUserData(this.userData);
   }
   // abstact method which is responsible for operations when data has changed
   onDataChange() {
      window.alert('This method (dataChange) should be implemented in  inheriting class')
   }
   // abstact method which is responsible for injecting html code into game root
   render() {
      window.alert('This method (render) should be implemented in  inheriting class')
   }

   // abstact method - getting the dom elements of newly injected html code
   getDOMElements() {
      window.alert('This method (getDOMElements) should be implemented in  inheriting class')
   }

   // abstract method - initialization of scripts
   initScripts() {
      window.alert('This method (initScripts) should be implemented in  inheriting class')
   }

   addLoading(){
      // set random monster
      this.loadingMonster.src = monstersData[Math.floor(Math.random() * monstersData.length)];
      this.loadingContainer.classList.remove('disabled');
   }
   removeLoading(){
      this.loadingContainer.classList.add('disabled');
   }

   clearMobileNav(){
      this.mobileNav.innerHTML = ''
   }

   // initialization 
   init() {
      this.clearMobileNav();
      this.addLoading();
      this.getUserData()
         .then(() => {
            this.dateOperations()
            this.render()
            this.getDOMElements();
            this.initScripts();
         })
         .then(()=> {
           this.removeLoading();
         })
         .catch(err => console.log(err))

   }
}

