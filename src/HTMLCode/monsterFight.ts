import { getRandomcongratulationsText } from './../properties/missions/congratulationsTexts';
import { FullUserStats, UserData, ShopItem } from '../types';

/**
 * get html code monster fight section
 * @param userStats - user statisctics (all)
 * @param userData  - data about user
 */
export const getMonsterFightHTMLCode = (userStats: FullUserStats, userData: UserData) :string => {

  // check if user has equiped weapon, if no then fist will be displayed
  const weapon: ShopItem | undefined = userData.equipmentItems[userData.equipmentItems.findIndex(el => el.type === 'weapon')];
  
    return `
    <section class='fight background'>

    <div id='fight_container'>

        <div class='fight__container'>

            <div class='fight__weaponWrapper '>
                <img src='./images/explosion.png' class='fight__explosion' />
                ${weapon !== undefined ?
                `<img src='${weapon.src}' class='fight__sword' />`
                :
                `<img src='./images/fist.png' class='fight__sword' />`
                }
            </div>

            <div class='fight__characterWrapper fight__characterWrapper-user'>

                <img class='fight__characterImg' src='${userData.portrait}' />
                <div class='fight__healthBar'>
                    <div class='fight__healthPoints'> <span id='user_HP'>${userStats.health}</span>/ ${userStats.health}
                    </div>
                    <div class='fight__health' id='user_HPBar'></div>
                </div>

                <table class='fight__statsTable'>
                    <tbody>
                        <tr>
                            <td>Strength</td>
                            <td>${userStats.strength}</td>
                        </tr>
                        <tr>
                            <td>Physical endurance</td>
                            <td>${userStats.physicalEndurance}</td>
                        </tr>
                        <tr>
                            <td>Defence</td>
                            <td>${userStats.defence}</td>
                        </tr>
                        <tr>
                            <td>luck</td>
                            <td>${userStats.luck}</td>
                        </tr>
                    </tbody>
                </table>

            </div>


            <!-- <div class='fight__characterWrapper fight__characterWrapper-monster monster-an'> -->
            <div class='fight__characterWrapper fight__characterWrapper-monster'>

                <div class='monster__explosionWrapper'>
                    <!--  <img src='./images/explosion.png'  class='monster__explosionImg monster__explosionImg-an'/> -->
                    <img src='./images/explosion.png' class='monster__explosionImg monster__explosionImg' />
                </div>

                <img class='fight__characterImg' src='${userData.currentMission.monster.src}' />
                <div class='fight__healthBar'>
                    <div class='fight__healthPoints'><span
                            id='monster_HP'>${userData.currentMission.monster.health}</span> /
                        ${userData.currentMission.monster.health}</div>
                    <div class='fight__health' id='monster_HPBar'></div>
                </div>

                <div style='width: 100%;'>

                    <table class='fight__statsTable'>
                        <tbody>
                            <tr>
                                <td>Strength</td>
                                <td>${userData.currentMission.monster.strength}</td>
                            </tr>
                            <tr>
                                <td>Physical endurance</td>
                                <td>${userData.currentMission.monster.physicalEndurance}</td>
                            </tr>
                            <tr>
                                <td>Defence</td>
                                <td>${userData.currentMission.monster.defence}</td>
                            </tr>
                            <tr>
                                <td>luck</td>
                                <td>${userData.currentMission.monster.luck}</td>
                            </tr>
                        </tbody>
                    </table>

                </div>

            </div>

        </div>

    </div>

    <div class='fight__summaryWrapper disabled' id='successful_fight_summary'>

        <div class='fight__summary'>
            <img class='fight__characterImg' src='${userData.currentMission.character}' />
            <h2 class='fight__summaryTitle'>${getRandomcongratulationsText()}</h2>
            <div class='fight__summaryPayout'>
                <div><img src='./images/coin.png' alt='coin' /> <strong>Gold: ${userData.currentMission.gold}</strong>
                </div>
                <div><img src='./images/mission_detail_increase.png' alt='coin' /> <strong>Experience:
                        ${userData.currentMission.exp}</strong></div>
            </div>
            <button class='fight__summaryBtn fight__summaryBtn-green' id='mission_success_btn'>Back to tavern</button>
        </div>

    </div>

    <div class='fight__summaryWrapper disabled' id='failed_fight_summary'>

        <div class='fight__summary'>
            <h2 class='fight__failed'>Mission failed</h2>
            <button class='fight__summaryBtn fight__summaryBtn-red' id='mission_failed_btn'>Back to tavern</button>
        </div>
        
    </div>

</section>
    `;
}

