const testEmail = (value ) => {
    const emailPattern = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/g
    return emailPattern.test(value)
}
const testCodeMelli = (value) => {
    // codes
}
const testPhoneNumber = (value) => {
    // codes
}
export default {
    testEmail ,
    testCodeMelli , 
    testPhoneNumber
}