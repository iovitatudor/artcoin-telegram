import {CategoryType} from "../types/CategoryType";

const CategoryMock: CategoryType[] = [
  {
    id: 1,
    parentId: 0,
    name: 'Spaces',
    description: 'Lorem ipsum',
    children: [{
      id: 2,
      parentId: 1,
      name: 'Event rooms',
      description: 'Lorem ipsum',
    }, {
      id: 3,
      parentId: 1,
      name: 'Co-working ',
      description: 'Lorem ipsum',
    }, {
      id: 4,
      parentId: 1,
      name: 'Studios',
      description: 'Lorem ipsum',
    }]
  },
  {
    id: 5,
    parentId: 0,
    name: 'Services',
    description: 'Lorem ipsum',
    children: [{
      id: 6,
      parentId: 5,
      name: 'Design & Art',
      description: 'Lorem ipsum',
    }, {
      id: 7,
      parentId: 5,
      name: 'IT',
      description: 'Lorem ipsum',
    }, {
      id: 8,
      parentId: 5,
      name: 'Content Management',
      description: 'Lorem ipsum',
    }]
  },
  {
    id: 9,
    parentId: 0,
    name: 'Events',
    description: 'Lorem ipsum',
    children: [{
      id: 10,
      parentId: 9,
      name: 'Cinemas ',
      description: 'Lorem ipsum',
    }, {
      id: 11,
      parentId: 9,
      name: 'Equipment ',
      description: 'Lorem ipsum',
    }]
  },
  {
    id: 12,
    parentId: 0,
    name: 'Food ',
    description: 'Lorem ipsum',
    children: null
  },
]

export default CategoryMock;