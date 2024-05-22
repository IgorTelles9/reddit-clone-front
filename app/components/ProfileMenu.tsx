import { CloseIcon } from "@chakra-ui/icons";
import { Avatar, IconButton, Menu, MenuButton, MenuItem, MenuList, Portal } from "@chakra-ui/react";
import React from "react";
import getGravatarUrl from "../lib/utils/getGravatar";
import { useLogoutMutation } from "../lib/graphql/generated/graphql";
import { useRouter } from "next/navigation";

interface ProfileMenuProps {
    username: string;
    email: string;
}

const ProfileMenu: React.FC<ProfileMenuProps> = ({ username, email }) => {
    const [logout] = useLogoutMutation();
    const router = useRouter();
    return (
        <Menu>
            <MenuButton
                as={IconButton}
                aria-label="Options"
                icon={<Avatar size="md" name={username} src={getGravatarUrl(email)} />}
                borderRadius={9999}
            />
            <Portal>
                <MenuList>
                    <MenuItem
                        icon={<CloseIcon />}
                        onClick={() => {
                            logout({ refetchQueries: ["Me"] }).then(() => router.push("/login"));
                        }}
                    >
                        logout
                    </MenuItem>
                </MenuList>
            </Portal>
        </Menu>
    );
};

export default ProfileMenu;
