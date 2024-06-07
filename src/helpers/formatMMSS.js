


export const formatMMSS = (secund) => {
    const min = Math.floor( secund / 60)
    const remainderSecund = Math.floor(secund % 60)

    return `${min} : ${remainderSecund}`
}