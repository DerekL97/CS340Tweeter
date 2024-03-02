import { AuthToken, User } from 'tweeter-shared';
// import { FakeData } from 'tweeter-shared';
import useToastListener from '../toaster/ToastListenerHook';
import useUserInfoContext from './useUserInfoContext';
import { UserService } from '../../model/service/UserService';

const useUserNavigation = () => {
	const { displayErrorMessage } = useToastListener();
	const { setDisplayedUser, currentUser, authToken } = useUserInfoContext();
	const userService: UserService = new UserService();
	const navigateToUser = async (event: React.MouseEvent): Promise<void> => {
		event.preventDefault();

		try {
			let alias = extractAlias(event.target.toString());

			let user = await userService.getUser(authToken!, alias);

			if (!!user) {
				if (currentUser!.equals(user)) {
					setDisplayedUser(currentUser!);
				} else {
					setDisplayedUser(user);
				}
			}
		} catch (error) {
			displayErrorMessage(`Failed to get user because of exception: ${error}`);
		}
	};

	const extractAlias = (value: string): string => {
		let index = value.indexOf("@");
		return value.substring(index);
	};

	return { navigateToUser };

};

export default useUserNavigation;