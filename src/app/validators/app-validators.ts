
export function urlValidator(control): { [Key: string]: any } {
    if (control.value) {
        if (control.value.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g)) {
            return null;
        }
        else {
            return { 'invalidUrl': true };
        }
    }

}

export function emailValidator(control): { [key: string]: any } {
    if (control.value) {
        if (control.value.match(/[^ @]*@[^ @]*/)) {
            return null;
        }
        else {
            return { 'invalidEmail': true };
        }
    }

}