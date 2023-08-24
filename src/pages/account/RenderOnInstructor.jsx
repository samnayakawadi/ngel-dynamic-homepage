import UserService from "../../services/UserService"

const RenderOnInstructor = ({ children }) => (
    UserService.hasRole(['instructor'])
) ? children : null;
export default RenderOnInstructor