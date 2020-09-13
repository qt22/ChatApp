const users= [];

const addUser = ({ id, name, room}) => {
    // Jerry App --> jerryapp

    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();

    const existingUser = users.find((user) => user.room === room && user.name === name); // prevent same name and same room

    if(existingUser){
        return {error: 'Username is taken'}
    }

    const user = { id, name, room };

    user.push(user)

    return { user }
}

const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id);

    if(index !== -1){
        return users.splice(index, 1)[0];
    }

}

const getUser = () => users.find((user) => user.id === id);

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = { addUser, removeUser, getUser, getUsersInRoom };