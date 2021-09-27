import { AuthForm } from "./authForm";
import { includeNumber, isUpper } from '../functions/other';
import validator from 'validator';
import { auth, db } from "../firebase";
import { getBlacksmithPicks } from '../functions/getBlacksmithPicks';
import { portraitsData } from '../properties/portraits/portraits';
import { FullUserStats, MissionData, ShopItem } from '../types';
import { getBlacksmithItems } from "../functions/getBlacksmithItems";
import { setCountdown } from '../functions/countdown';
import { potionsData } from "../properties/shop/potions";
import { getRandomShopItem } from "../functions/getRandomShopItem";
import { getNeededExp } from '../functions/getNeededExp';
import { getRandomMission, getRandomMissions } from '../functions/missionGenerator';
import { initialUserProfile } from '../properties/initialUserProfile/initialUserProfile';

export class Register extends AuthForm {

    private invalid: {
        eMail: HTMLElement
        password: HTMLElement
        repeatPassword: HTMLElement
        nickname: HTMLElement
    }
    private input: {
        eMail: HTMLElement
        password: HTMLElement
        repeatPassword: HTMLElement
        nickname: HTMLElement
    }
    constructor(root) {
        super(root)
        this.invalid = {
            eMail: document.getElementById("register__invalidData-email"),
            password: document.getElementById("register__invalidData-password"),
            repeatPassword: document.getElementById("register__invalidData-repeatPassword"),
            nickname: document.getElementById("register__invalidData-nickname")
        }
        this.input = {
            eMail: document.querySelector("#form__register input[name='eMail']"),
            password: document.querySelector("#form__register input[name='password']"),
            repeatPassword: document.querySelector("#form__register input[name='repeatPassword']"),
            nickname: document.querySelector("#form__register input[name='nickname']"),
        }
    }

    // creating new user with his own data in firestore
    authAction() {

        // hide button and show loading
        this.btn.style.display = "none";
        this.loading.style.display = "block";



        const wizardWheelItems: ShopItem[] = []


        // add blacksmith items
        const items: ShopItem[] = getBlacksmithItems({
            strength: 50,
            physicalEndurance: 50,
            defence: 50,
            luck: 50
        });
        // aslo,  user can get gold
        const gold: ShopItem = {
            type: 'gold',
            name: 'Gold',
            rarity: 'legendary',
            src: './images/gold_chest.png',
            description: `${300} gold will always comforting`,
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

        items.push(getRandomShopItem(potionsData))
        // set won item
        const magicWheel = {
            items,
            wonItem: items[Math.floor(Math.random() * items.length)]
        }
        const fullUserStats: FullUserStats = {
            damage: 35,
            health: 35,
            damageReduce: 35,
            critical: 35,
            defence: 50,
            luck: 50,
            physicalEndurance: 50,
            strength: 50
        }

        // create new user in firebase
        const unlisten = async () => {
            await auth.createUserWithEmailAndPassword(this.data.eMail, this.data.password)
                .then((cred) => {

                    const createData = async () => {
                        await db.collection("users")
                            .doc(cred.uid)
                            .set({
                                lastVisit: new Date(),
                                nick: this.data.nickname,
                                level: 1,
                                guardPayout: 100,
                                gold: 1000,
                                rawStats: {
                                    defence: 50,
                                    luck: 50,
                                    physicalEndurance: 50,
                                    strength: 50
                                },
                                stats: {
                                    damage: 35,
                                    health: 35,
                                    damageReduce: 35,
                                    critical: 35
                                },
                                shop: {
                                    blacksmith: null,
                                    wizard: null
                                },
                                shopPicks: {
                                    blacksmith: getBlacksmithPicks(),
                                    wizard: null
                                },
                                equipmentItems: [],
                                backpackItems: [],
                                status: 'free',
                                guard: {
                                    current: null,
                                    start: null,
                                    end: null,
                                    payout: null
                                },
                                pet: null,
                                potions: {
                                    first: null,
                                    second: null
                                },
                                description: '',
                                portrait: portraitsData[0],
                                exp: 0,
                                wizardWheelSpin: true,
                                magicWheel,
                                nextLevelAt: getNeededExp(1),
                                missionWillingness: 100,
                                currentMission: null,
                                availableMissions: getRandomMissions(10, 100, fullUserStats, null),
                                friends: []
                            }).then(async () => {
                                await db.collection('chat')
                                    .doc(`${cred.uid}`)
                                    .collection('conversations').add({ initial: true });

                            })
                            .then(() => {
                                location.href = '/'
                            })
                    }
                    createData();
                }
                )
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.error(errorCode, errorMessage)
                    if (errorCode === "auth/email-already-in-use") {
                        this.invalid.eMail.innerText = "This e-mail is already in use.";
                        this.input.eMail.style.borderBottomColor = "#e63946";
                    }
                });
        }


        // show button and hide loading
        this.loading.style.display = "none";
        this.btn.style.display = "block";

        unlisten()

    }


    setErrors() {
        // checking email
        if (!validator.isEmail(this.data.eMail)) {
            this.invalid.eMail.innerText = "Invalid e-mail.";
            this.input.eMail.style.borderBottomColor = "#e63946";
        }

        // checking password
        if (this.data.password.length <= 6 && !includeNumber(this.data.password) && !isUpper(this.data.password)) {
            this.invalid.password.style.color = "#e63946";
            this.input.password.style.borderBottomColor = "#e63946";
        }

        //checking if the user has entered two identical passwords
        if (this.data.password !== this.data.repeatPassword) {
            this.invalid.repeatPassword.innerText = "Passwords should be the same.";
            this.input.repeatPassword.style.borderBottomColor = "#e63946";
        }

        if (this.data.nickname.length < 4) {
            this.invalid.nickname.style.color = "#e63946";
            this.input.nickname.style.borderBottomColor = "#e63946";
        }
    }

    removeErrors() {
        // for email
        if (validator.isEmail(this.data.eMail)) {
            this.invalid.eMail.innerText = "";
            this.input.eMail.style.borderBottomColor = "#ffcd00";
        }

        // for password
        if (this.data.password.length >= 6 && includeNumber(this.data.password) && isUpper(this.data.password)) {
            this.invalid.password.style.color = "#03071e";
            this.input.password.style.borderBottomColor = "#ffcd00";
        }

        // for  repeated password
        if (this.data.password === this.data.repeatPassword) {
            this.invalid.repeatPassword.innerText = "";
            this.input.repeatPassword.style.borderBottomColor = "#ffcd00";
        }

        // for nickname
        if (this.data.nickname.length >= 4) {
            this.invalid.nickname.style.color = "#03071e";
            this.input.nickname.style.borderBottomColor = "#ffcd00";
        }



    }
    checkData() {

        this.removeErrors();

        // checking requirements
        if (!validator.isEmail(this.data.eMail)
            || this.data.password.length <= 6
            || !includeNumber(this.data.password)
            || !isUpper(this.data.password)
            || this.data.password !== this.data.repeatPassword
            || validator.isEmpty(this.data.nickname)
            || !validator.matches(this.data.nickname, '^[a-zA-Z0-9_.-]*$')
            || this.data.nickname.length <= 4

        ) {
            this.invalidData = true;
        }
        else {
            this.invalidData = false;
        }
    }

}