// INPUT UPPERCASE
const fields = document.querySelectorAll(' .item input[type="text"], .item select')

if(fields) {
    function forceInputUppercase(e) {
        var start = e.target.selectionStart;
        var end = e.target.selectionEnd;
        e.target.value = e.target.value.toUpperCase();
        e.target.setSelectionRange(start, end);
    }
    for(field of fields) {
        field.addEventListener("keyup", forceInputUppercase, false);
    }
}



// MASK INPUT

const Mask = {
    apply(input, func) {
        setTimeout(function() {
            input.value = Mask[func](input.value)
        }, 1)
    },
    cpf(value) {
        value = value.replace(/\D/g,"")

        //limit characters
        if (value.length > 11){
            value = value.slice(0, -1)
        }

        value = value
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    
        return value
    },
    cep(value) {
        value = value
            .replace(/\D/g,"")
            .replace(/(\d{5})(\d)/, '$1-$2')

        if (value.length > 9){
            value = value.slice(0, -1)
        }
        return value

    },
    phone(value) {
        value = value
            .replace(/\D/g,"")
            .replace(/(\d{2})(\d)/, '($1) $2')
            .replace(/(\d{4})(\d)/, '$1-$2')
            .replace(/(\d{4})-(\d)(\d{4})/, '$1$2-$3')
            .replace(/(-\d{4})\d+?$/, '$1')
        
        return value
    }
}

const Validate = {
    apply(input, func) {
        Validate.clearErrors(input)

        let results = Validate[func](input.value)
        input.value = results.value

        if(results.error)
            Validate.displayError(input, results.error)

    },    
    displayError(input, error) {
        const div = document.createElement('div')
        div.classList.add('error')
        div.innerHTML = error
        input.parentNode.appendChild(div)
        input.focus()
    },
    clearErrors(input) {
        const errorDiv = input.parentNode.querySelector(".error")
        if (errorDiv)
            errorDiv.remove()
    },
    isEmail(value) {
        let error = null

        //creating regular expression to validate email
        const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+/

        if (!value.match(mailFormat))
            error = "E-mail inválido"

        return {
            error,
            value
        }
    },
    isCpf(value) {
        let error = null

        const cleanValues = value.replace(/\D/g, "")

        if (cleanValues.length < 12 && cleanValues.length !== 11) {
            error = "CPF Inválido"
        }

        return {
            error,
            value
        }
    },
    isPhone(value) {
        let error = null

        const cleanValues = value.replace(/\D/g, "")

        if (cleanValues.length < 12 && cleanValues.length !== 11) {
            error = "Número de telefone celular incorreto"
        }

        return {
            error,
            value
        }
    },
    isCep(value) {
        let error = null

        const cleanValues = value.replace(/\D/g, "")

        if (cleanValues.length !== 8) {
            error = "CEP inválido"
        }

        return {
            error,
            value
        }
    },
    allFields(e) {
        const itens = document.querySelectorAll(' .item input, .item select')


        for (item of itens) {
            if (item.value == "" && item.id != "not_required") {
                const message = document.createElement('div')
                message.classList.add('messages')
                message.classList.add('error')
                message.style.position = 'fixed'

                message.innerHTML = "Por favor, preencha os campos obrigatórios!"
                document.querySelector('body').append(message)

                e.preventDefault()
            }
        }
    }
}

// SELECT FUNCTIONS
const functions = document.querySelectorAll(".functions-grid li");

for(const func of functions) {
    func.addEventListener("click", handleselectedFunction)
}

const collectedFunc = document.querySelector("input[name=funcs");

let selectedFuncs = []

function handleselectedFunction(event) {
    const itemLi = event.target;

    //toggle add or remove class;
    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id

    const alreadySelected = selectedFuncs.findIndex(item => {
        const itemFound = item == itemId
        return itemFound
    })

    if(alreadySelected >= 0) {
        const filteredItems = selectedFuncs.filter( item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })
        selectedFuncs=filteredItems
    } else {
        selectedFuncs.push(itemId)
    }

    collectedFunc.value = selectedFuncs

}