const faker = require('faker')
faker.locale = 'pt_BR'
const { hash } = require('bcryptjs')

const User = require('./src/app/models/User')

let totalUsers = 50

const funcs = [
    "Regular(F01)",
    "Especial(F02)",
    "Regular(F01),Especial(F02)"
]

const periodCourse = [
    "1° Período/Semestre",
    "2° Período/Semestre",
    "3° Período/Semestre",
    "4° Período/Semestre",
    "5° Período/Semestre",
    "6° Período/Semestre",
    "7° Período/Semestre",
    "8° Período/Semestre",
]

async function createUsers() {
    const users = []
    const password = await hash('123', 8)

    while (users.length < totalUsers) {
        users.push({
            name: faker.name.firstName(),
            cpf: faker.random.number(99999999999),
            birth_date: Date.parse(faker.date.past(18)),
            deficient: Math.floor(Math.random() * 2),
            cep: faker.address.zipCode(),
            address: faker.address.streetName(),
            address_number: faker.random.number(999),
            address_complement: "",
            address_district: faker.address.streetName(),
            course_id: Math.ceil(Math.random() * 4),
            college_id: Math.ceil(Math.random() * 4),
            funcs: funcs[Math.floor(Math.random() * 3)],
            period_course: periodCourse[Math.floor(Math.random() * 8)],
            specialization_regular: Math.floor(Math.random() * 2),
            specialization_special: Math.floor(Math.random() * 2),
            email: faker.internet.email(),
            phone1: faker.random.number(99999999999),
            phone2: "",
            password,
        })
    }

    const usersPromise = users.map(user => User.create(user))

    usersIds = await Promise.all(usersPromise)
}

// async function createProducts() {
//     let products = []

//     while (products.length < totalProducts) {
//         products.push({
//             category_id: Math.ceil(Math.random() * 3),
//             user_id: usersIds[Math.floor(Math.random() * totalUsers)],
//             name: faker.name.title(),
//             description: faker.lorem.paragraph(Math.ceil(Math.random() * 10)),
//             old_price: faker.random.number(9999),
//             price: faker.random.number(9999),
//             quantity: faker.random.number(99),
//             status: Math.round(Math.random())
//         })
//     }

//     const productsPromise = products.map(product => Product.create(product))
//     productsIds = await Promise.all(productsPromise)

//     let files = []

//     while(files.length < 50) {
//         files.push({
//             name: faker.image.image(),
//             path: `public/images/placeholder.png`,
//             product_id: productsIds[Math.floor(Math.random() * totalProducts)]
//         })
//     }
    
//     const filesPromise = files.map(file => File.create(file))

//     await Promise.all(filesPromise)
// }

async function init() {
    await createUsers()
    // await createProducts()
}

init()