import { StarIcon, BookIcon, UserIcon, LevelUpIcon } from '../components/Icons';

export const features = [
  {
    id: 1,
    title: 'Points and Badges',
    description:
      'Earn rewards including in-game points and unique badges for completing levels and activities!',
    borderColor: 'border-orange-500',
    iconColor: 'text-orange-500',
    icon: <StarIcon />,
  },
  {
    id: 2,
    title: 'Empowerment Activities',
    description:
      'Go through empowerment activities to refine your cyber security knowledge!',
    borderColor: 'border-blue-500',
    iconColor: 'text-blue-400',
    icon: <BookIcon />,
  },
  {
    id: 3,
    title: 'Account Creation',
    description:
      'Create your personal account to save progress and customize your profile.',
    borderColor: 'border-purple-500',
    iconColor: 'text-purple-500',
    icon: <UserIcon />,
  },
  {
    id: 4,
    title: 'Level up',
    description:
      'Gain experience and level up your character to unlock new challenges!',
    borderColor: 'border-green-500',
    iconColor: 'text-green-400',
    icon: <LevelUpIcon />,
  },
];