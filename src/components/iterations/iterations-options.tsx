import { useDisclosure, Center, IconButton, Menu, MenuButton, MenuList, MenuItem, Drawer } from '@chakra-ui/react';
import { RiDeleteBinLine, SlOptions, BiEdit } from 'react-icons/all';

import { useDeleteIterationMutation } from '../../query/iterations/iterations.hook';
import { Iteration } from '../../query/iterations/iterations.type';

import { EditIterationForm } from './edit-iteration-form';

interface Props {
    iteration: Iteration;
    refetch: () => Promise<unknown>;
}
export const IterationsOptions = ({ iteration, refetch }: Props): JSX.Element => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const { mutate: deleteIteration } = useDeleteIterationMutation();

    const handleDelete = (): void => {
        deleteIteration(iteration.id, { onSuccess: () => refetch() });
    };

    return (
        <>
            <Menu>
                <MenuButton as={IconButton} aria-label="Опції">
                    <Center>
                        <SlOptions />
                    </Center>
                </MenuButton>
                <MenuList>
                    <MenuItem p={5} icon={<BiEdit />} onClick={onOpen}>
                        Редагувати
                    </MenuItem>
                    <MenuItem p={5} onClick={handleDelete} icon={<RiDeleteBinLine />}>
                        Видалити
                    </MenuItem>
                </MenuList>
            </Menu>

            <Drawer placement="bottom" onClose={onClose} isOpen={isOpen}>
                <EditIterationForm onClose={onClose} iteration={iteration} refetch={refetch} />
            </Drawer>
        </>
    );
};
