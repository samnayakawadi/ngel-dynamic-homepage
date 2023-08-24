import UserService from "../../services/UserService"

const RenderOnAdmin = ({ children }) => (
    UserService.hasRole(['admin'])
) ? children : null;
export default RenderOnAdmin