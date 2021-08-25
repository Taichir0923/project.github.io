// Event 
// Data structure

// Хэрэглэгчийн мэдээлэл хадгалах функц бичих.

// 1. Байгуулагч функц
//    1.1. Имэйл, Овог нэр, утасны дугаар, төрсөн он сар өдөр, id, нууц үг, Гэрийн хаяг, avatar

// 2. Форм үүсгэх

// 3. Функц бичих
//    3.1. DOM-с элементүүдээ авах
//    3.2. Тодорхой нөхцлийн дагуу дата үүсгэх. // Нууц үг шаардлага хангах, ямар нэг хоосон инпут байх ёсгүй
//    3.2. Үүсгэсэн датаг Local Storage дотор хадгалах.

// 4. Нэвтрэх хуудас
//    4.1. Хэрэглэгч оруулсан имэйлийг локал дотор байгаа эсэхийг шалгана.
//    4.2. Байгаа тохиолдолд нууц үгийг нь шалгах.
//    4.3. Нууц үг болон имэйл зөв бол хэрэглэгчийн хуудас руу шилжих
const fullname = document.querySelector('#fullname');
const email = document.querySelector('#email');
const number = document.querySelector('#number');
const dob = document.querySelector('#dob');
const avatar = document.querySelector('#avatar');
const address = document.querySelector('#address');
const password = document.querySelector('#password');
const passwordConfirm = document.querySelector('#passwordConfirm');
const register = document.querySelector('#register');

const checkPass = document.querySelectorAll('.checkPass');

const mains = document.querySelectorAll('.main');

let isValidPassword, isValidForm, passwordMatched;

let users = [];

class User {
    constructor(fullname, email, number, dob, avatar, address, password){
        this.fullname = fullname;
        this.email = email;
        this.number = number;
        this.dob = dob;
        this.avatar = avatar;
        this.address = address;
        this.password = password;
        this.id = +Math.random().toString().split('.')[1];
    }
}



password.addEventListener('input', () => {
    let checks = [/[a-z]/, /[A-Z]/, /\d/, /\W/, /.{8,}/];
    let checkPassStrength = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)(.{8,})/;
    checks.forEach((el, index) => {
        checkPassword(checkPass[index], el.test(password.value));
    });

    passStrength(password, checkPassStrength.test(password.value))
    checkPassStrength.test(password.value) ? isValidPassword = true : isValidPassword = false;
});

passwordConfirm.addEventListener('input', () => {
    passStrength(passwordConfirm, password.value === passwordConfirm.value);
})

function checkPassword(arg, bool){
    if(!bool){
        arg.classList.add('text-red-400');
    } else {
        arg.classList.remove('text-red-400');
        arg.classList.add('line-through');
    }
}

function passStrength(arg, bool){
    if(!bool){
        arg.classList.add('border-red-400')
        arg.classList.remove('border-green-400')
        passwordMatched = false
    } else {
        arg.classList.remove('border-red-400')
        arg.classList.add('border-green-400')
        passwordMatched = true
    }
}

function checkForm(){
    mains.forEach(el => {
        passStrength(el, el.value !== "");
        if(el.value !== ""){
            isValidForm = true
        } else {
            isValidForm = false
        }
    })
}

register.addEventListener('click', e => {
    e.preventDefault();
    checkForm();
    if(passwordMatched && isValidPassword && isValidForm){
        let existingUser = users.find(el => el.email === email.value);
        let existingNumber = users.find(el => el.number === number.value);
        if(existingUser){
            swal({
                title: "Алдаа гарлаа",
                text: "Бүртгэлтэй имэйл байна...",
                icon: "error" // warning, error, success
            })
            return
        } 
        
        if(existingNumber){
            swal({
                title: "Алдаа гарлаа",
                text: "Бүртгэлтэй дугаар байна...",
                icon: "error" // warning, error, success
            })
            return
        }

        const user = new User(fullname.value, email.value, number.value, dob.value, avatar.value, address.value, password.value);
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
        resetForm()

        swal({
            title: "Амжилттай бүртгэгдлээ",
            icon: "success" // warning, error, success
        })
    }
})

function resetForm(){
    fullname.value = '';
    email.value = '';
    number.value = null;
    avatar.value = '';
    dob.value = null;
    address.value = '';
    password.value = '';
    passwordConfirm.value = '';
}

function getDataFromLocal(){
    if(localStorage['users']){
        users = JSON.parse(localStorage['users'])
    }
}

getDataFromLocal()

// Массив дотор хэрэглэгчийн датаг хадгалах.
// LocalStorage судлаад, дотор нь хэрэглэгчдийн датаг хадгалах.
