export const descendingSort = (x,y) => {
    if(x._id < y._id) return 1;
    if(x._id > y._id) return -1;
    return 0;
};