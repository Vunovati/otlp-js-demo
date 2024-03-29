/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/
import { Fragment, useState } from 'react'
import { Dialog, Popover, Tab, Transition } from '@headlessui/react'
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  QuestionMarkCircleIcon,
  ShoppingBagIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/20/solid'


// const currencies = ['CAD', 'USD', 'AUD', 'EUR', 'GBP']
const navigation = {
  categories: [
    {
      name: 'Women',
      featured: [
      //   {
      //     id: 3,
      //     name: 'Basic Tee',
      //     href: '#',
      //     // TODO: add some sample images to the gh repo
      //     imageSrc:
      //       'src/WebShopImages/BasicTee/BasicTee07.jpg',
      //     imageAlt: "Front of men's Basic Tee in black.",
      //     price: 37,
      //     color: 'Black'
          
      //   },{
      //     id: 4,
      //     name: 'Hoodie',
      //     href: '#',
      //     // TODO: add some sample images to the gh repo
      //     imageSrc:
      //       'src/WebShopImages/Hoodie/hoodie01.jpg',
      //     imageAlt: "Front of men's Basic Tee in black.",
      //     price: 42,
      //     color: 'White'
      //   },
        
      //   {
      //     id: 5,
      //     name: 'Hoodie',
      //     href: '#',
      //     imageSrc: 'src/WebShopImages/Hoodie/hoodie02.jpg',
      //     imageAlt: "Front of men's Striped Shirt.",
      //     price: 50,
      //     color: 'Orange'
      //   },
      //   {
      //     id: 6,
      //     name: 'Hoodie',
      //     href: '#',
      //     imageSrc: 'src/WebShopImages/Hoodie/hoodie03.jpg',
      //     imageAlt: "Front of men's Denim Jeans.",
      //     price: 60,
      //     color: 'Mint'
      //   },
      //   {
      //     id: 7,
      //     name: 'Leather Jacket',
      //     href: '#',
      //     imageSrc: 'src/WebShopImages/Leather/leather01.jpg',
      //     imageAlt: "Front of woman's Leather Jacket.",
      //     price: 120,
      //     color: 'Round Collar'
      //   },
      //   {
      //     id: 8,
      //     name: 'Leather Jacket',
      //     href: '#',
      //     imageSrc: 'src/WebShopImages/Leather/leather02.jpg',
      //     imageAlt: "Front of woman's Sneakers.",
      //     price: 80,
      //     color: 'Regular Collar'
      //   },
      //   {
      //     id: 10,
      //     name: 'Striped Shirt',
      //     href: '#',
      //       // TODO: add some sample images to the gh repo
      //     imageSrc:
      //         'src/WebShopImages/StripedTee/Striped03.jpg',
      //     imageAlt: "Front of men's Basic Tee in black.",
      //     price: 35,
      //     color: 'Female'
      //  },
      //  {
      //   id: 15,
      //   name: 'Denim Jeans',
      //   href: '#',
      //   // TODO: add some sample images to the gh repo
      //   imageSrc:
      //     'src/WebShopImages/Jeans/jeans01.jpg',
      //   imageAlt: "Front of men's Basic Tee in black.",
      //   price: 35,
      //   color: 'Classic Jeans'
      // }
        
      ],
    },
    {
      name: 'Men',
      featured: [
    //     {
    //       id: 1,
    //       name: 'Basic Tee',
    //       href: '#',
    //       // TODO: add some sample images to the gh repo
    //       imageSrc:
    //         'src/WebShopImages/BasicTee/BasicTee01.jpg',
    //       imageAlt: "Front of men's Basic Tee in black.",
    //       price: 35,
    //       color: 'White'
    //     },
    //     {
    //       id: 2,
    //       name: 'Basic Tee',
    //       href: '#',
    //       // TODO: add some sample images to the gh repo
    //       imageSrc:
    //         'src/WebShopImages/BasicTee/BasicTee06.jpg',
    //       imageAlt: "Front of men's Basic Tee in black.",
    //       price: 45,
    //       color: 'White'
    //     },
  
    //     {
    //       id: 9,
    //       name: 'Striped Shirt',
    //       href: '#',
    //       // TODO: add some sample images to the gh repo
    //       imageSrc:
    //         'src/WebShopImages/StripedTee/Striped02.jpg',
    //       imageAlt: "Front of men's Basic Tee in black.",
    //       price: 35,
    //       color: 'Male'
    //     },
    //     {
    //   id: 16,
    //   name: 'Denim Jeans',
    //   href: '#',
    //   // TODO: add some sample images to the gh repo
    //   imageSrc:
    //     'src/WebShopImages/Jeans/jeans02.jpg',
    //   imageAlt: "Front of men's Basic Tee in black.",
    //   price: 35,
    //   color: 'Ripped Jeans'
    // },
    // {
    //   id: 17,
    //   name: 'Turtleneck',
    //   href: '#',
    //   // TODO: add some sample images to the gh repo
    //   imageSrc:
    //     'src/WebShopImages/Turtleneck/turtleneck01.jpg',
    //   imageAlt: "Front of men's Basic Tee in black.",
    //   price: 35,
    //   color: 'Midnight Blue'
    // },
    // {
    //   id: 18,
    //   name: 'Turtleneck',
    //   href: '#',
    //   // TODO: add some sample images to the gh repo
    //   imageSrc:
    //     'src/WebShopImages/Turtleneck/turtleneck02.jpg',
    //   imageAlt: "Front of men's Basic Tee in black.",
    //   price: 35,
    //   color: 'Black'
    // },
    // {
    //   id: 19,
    //   name: 'Turtleneck',
    //   href: '#',
    //   // TODO: add some sample images to the gh repo
    //   imageSrc:
    //     'src/WebShopImages/Turtleneck/turtleneck03.jpg',
    //   imageAlt: "Front of men's Basic Tee in black.",
    //   price: 35,
    //   color: 'White'
    // }
      ],
    },
    {
      name: 'New Arrivals',
      featured: [
    //     {
    //       id: 1,
    //       name: 'Basic Tee',
    //       href: '#',
    //       // TODO: add some sample images to the gh repo
    //       imageSrc:
    //         'src/WebShopImages/BasicTee/BasicTee01.jpg',
    //       imageAlt: "Front of men's Basic Tee in black.",
    //       price: 35,
    //       color: 'White'
    //     },
    //     {
    //       id: 2,
    //       name: 'Basic Tee',
    //       href: '#',
    //       // TODO: add some sample images to the gh repo
    //       imageSrc:
    //         'src/WebShopImages/BasicTee/BasicTee06.jpg',
    //       imageAlt: "Front of men's Basic Tee in black.",
    //       price: 45,
    //       color: 'White'
    //     },
  
    //     {
    //       id: 9,
    //       name: 'Striped Shirt',
    //       href: '#',
    //       // TODO: add some sample images to the gh repo
    //       imageSrc:
    //         'src/WebShopImages/StripedTee/Striped02.jpg',
    //       imageAlt: "Front of men's Basic Tee in black.",
    //       price: 35,
    //       color: 'Male'
    //     },
    //     {
    //   id: 16,
    //   name: 'Denim Jeans',
    //   href: '#',
    //   // TODO: add some sample images to the gh repo
    //   imageSrc:
    //     'src/WebShopImages/Jeans/jeans02.jpg',
    //   imageAlt: "Front of men's Basic Tee in black.",
    //   price: 35,
    //   color: 'Ripped Jeans'
    // },
    // {
    //   id: 17,
    //   name: 'Turtleneck',
    //   href: '#',
    //   // TODO: add some sample images to the gh repo
    //   imageSrc:
    //     'src/WebShopImages/Turtleneck/turtleneck01.jpg',
    //   imageAlt: "Front of men's Basic Tee in black.",
    //   price: 35,
    //   color: 'Midnight Blue'
    // },
    // {
    //   id: 18,
    //   name: 'Turtleneck',
    //   href: '#',
    //   // TODO: add some sample images to the gh repo
    //   imageSrc:
    //     'src/WebShopImages/Turtleneck/turtleneck02.jpg',
    //   imageAlt: "Front of men's Basic Tee in black.",
    //   price: 35,
    //   color: 'Black'
    // },
    // {
    //   id: 19,
    //   name: 'Turtleneck',
    //   href: '#',
    //   // TODO: add some sample images to the gh repo
    //   imageSrc:
    //     'src/WebShopImages/Turtleneck/turtleneck03.jpg',
    //   imageAlt: "Front of men's Basic Tee in black.",
    //   price: 35,
    //   color: 'White'
    // }
      ],
    },
  ],
  pages: [
    { name: 'New Arrivals', href: '#' },
    
  ],
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Header() {
  const [open, setOpen] = useState(false)

  // const toggleMenu = () => {
  //   setOpen(!open);
  //   if (!open) {
  //     document.body.classList.add('overflow-hidden');
  //   } else {
  //     document.body.classList.remove('overflow-hidden');
  //   }
  // };

  return (
    <div className="bg-white">
      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                <div className="flex px-4 pb-2 pt-5">
                  <button
                    type="button"
                    className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Links */}
                <Tab.Group as="div" className="mt-2">
                  <div className="border-b border-gray-200">
                    <Tab.List className="-mb-px flex space-x-8 px-4">
                      {navigation.categories.map((category) => (
                        <Tab
                          key={category.name}
                          className={({ selected }) =>
                            classNames(
                              selected ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-900',
                              'flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium'
                            )
                          }
                        >
                          {category.name}
                        </Tab>
                      ))}
                    </Tab.List>
                  </div>
                  <Tab.Panels as={Fragment}>
                    {navigation.categories.map((category) => (
                      <Tab.Panel key={category.name} className="space-y-12 px-4 py-6">
                        <div className="grid grid-cols-2 gap-x-4 gap-y-10">
                          {category.featured.map((item) => (
                            <div key={item.name} className="group relative">
                              <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-md bg-gray-100 group-hover:opacity-75">
                                <img src={item.imageSrc} alt={item.imageAlt} className="object-cover object-center" />
                              </div>
                              <a href={item.href} className="mt-6 block text-sm font-medium text-gray-900">
                                <span className="absolute inset-0 z-10" aria-hidden="true" />
                                {item.name}
                              </a>
                              <p aria-hidden="true" className="mt-1 text-sm text-gray-500">
                                Shop now
                              </p>
                            </div>
                          ))}
                        </div>
                      </Tab.Panel>
                    ))}
                  </Tab.Panels>
                </Tab.Group>

                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  {navigation.pages.map((page) => (
                    <div key={page.name} className="flow-root">
                      <a href={page.href} className="-m-2 block p-2 font-medium text-gray-900">
                        {page.name}
                      </a>
                    </div>
                  ))}
                </div>

                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  <div className="flow-root">
                    <a href="#" className="-m-2 block p-2 font-medium text-gray-900">
                      Create an account
                    </a>
                  </div>
                  <div className="flow-root">
                    <a href="#" className="-m-2 block p-2 font-medium text-gray-900">
                      Sign in
                    </a>
                  </div>
                </div>

                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  {/* Currency selector */}
                  {/* <form>
                    <div className="inline-block">
                      <label htmlFor="mobile-currency" className="sr-only">
                        Currency
                      </label>
                      <div className="group relative -ml-2 rounded-md border-transparent focus-within:ring-2 focus-within:ring-white">
                        <select
                          id="mobile-currency"
                          name="currency"
                          className="flex items-center rounded-md border-transparent bg-none py-0.5 pl-2 pr-5 text-sm font-medium text-gray-700 focus:border-transparent focus:outline-none focus:ring-0 group-hover:text-gray-800"
                        >
                          {currencies.map((currency) => (
                            <option key={currency}>{currency}</option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center">
                          <ChevronDownIcon className="h-5 w-5 text-gray-500" aria-hidden="true" />
                        </div>
                      </div>
                    </div>
                  </form> */}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <header className="relative">
        <nav aria-label="Top">
          {/* Top navigation */}
          <div className="bg-gray-900">
            <div className="mx-auto flex h-10 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
              {/* Currency selector */}
              {/* <form>
                <div>
                  <label htmlFor="desktop-currency" className="sr-only">
                    Currency
                  </label>
                  <div className="group relative -ml-2 rounded-md border-transparent bg-gray-900 focus-within:ring-2 focus-within:ring-white">
                    <select
                      id="desktop-currency"
                      name="currency"
                      className="flex items-center rounded-md border-transparent bg-gray-900 bg-none py-0.5 pl-2 pr-5 text-sm font-medium text-white focus:border-transparent focus:outline-none focus:ring-0 group-hover:text-gray-100"
                    >
                      {currencies.map((currency) => (
                        <option key={currency}>{currency}</option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center">
                      <ChevronDownIcon className="h-5 w-5 text-gray-300" aria-hidden="true" />
                    </div>
                  </div>
                </div>
              </form> */}

              <div className="flex items-center space-x-6">
                <a href="#" className="text-sm font-medium text-white hover:text-gray-100">
                  Sign in
                </a>
                <a href="#" className="text-sm font-medium text-white hover:text-gray-100">
                  Create an account
                </a>
              </div>
            </div>
          </div>

          {/* Secondary navigation */}
          <div className="bg-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="border-b border-gray-200">
                <div className="flex h-16 items-center justify-between">
                  {/* Logo (lg+) */}
                  <div className="hidden lg:flex lg:flex-1 lg:items-center">
                    <a href="#">
                      <span className="sr-only">Your Company</span>
                      
                    </a>
                  </div>

                  <div className="hidden h-full lg:flex">
                    {/* Flyout menus */}
                    <Popover.Group className="inset-x-0 bottom-0 px-4">
                      <div className="flex h-full justify-center space-x-8">
                        {navigation.categories.map((category) => (
                          <Popover key={category.name} className="flex">
                            {({ open }) => (
                              <>
                                <div className="relative flex">
                                  <Popover.Button
                                    className={classNames(
                                      open
                                        ? 'border-indigo-600 text-indigo-600'
                                        : 'border-transparent text-gray-700 hover:text-gray-800',
                                      'relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out'
                                    )}
                                  >
                                    {category.name}
                                  </Popover.Button>
                                </div>

                                <Transition
                                  as={Fragment}
                                  enter="transition ease-out duration-200"
                                  enterFrom="opacity-0"
                                  enterTo="opacity-100"
                                  leave="transition ease-in duration-150"
                                  leaveFrom="opacity-100"
                                  leaveTo="opacity-0"
                                >
                                  <Popover.Panel className="absolute inset-x-0 top-full text-sm text-gray-500">
                                    {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                                    <div className="absolute inset-0 top-1/2 bg-white shadow" aria-hidden="true" />

                                    <div className="relative bg-white">
                                      <div className="mx-auto max-w-7xl px-8">
                                        <div className="grid grid-cols-4 gap-x-8 gap-y-10 py-16">
                                          {category.featured.map((item) => (
                                            <div key={item.name} className="group relative">
                                              <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-md bg-gray-100 group-hover:opacity-75">
                                                <img
                                                  src={item.imageSrc}
                                                  alt={item.imageAlt}
                                                  className="object-cover object-center"
                                                />
                                              </div>
                                              <a href={item.href} className="mt-4 block font-medium text-gray-900">
                                                <span className="absolute inset-0 z-10" aria-hidden="true" />
                                                {item.name}
                                              </a>
                                              <p aria-hidden="true" className="mt-1">
                                                Shop now
                                              </p>
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    </div>
                                  </Popover.Panel>
                                </Transition>
                              </>
                            )}
                          </Popover>
                        ))}

                        {navigation.pages.map((page) => (
                          <a
                            key={page.name}
                            href={page.href}
                            className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                          >
                            {page.name}
                          </a>
                        ))}
                      </div>
                    </Popover.Group>
                  </div>

                  {/* Mobile menu and search (lg-) */}
                  <div className="flex flex-1 items-center lg:hidden">
                    <button
                      type="button"
                      className="-ml-2 rounded-md bg-white p-2 text-gray-400"
                      onClick={() => setOpen(true)}
                    >
                      <span className="sr-only">Open menu</span>
                      <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                    </button>

                    {/* Search */}
                    <a href="#" className="ml-2 p-2 text-gray-400 hover:text-gray-500">
                      <span className="sr-only">Search</span>
                      <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
                    </a>
                  </div>

                  {/* Logo (lg-) */}
                  <a href="#" className="lg:hidden">
                    <span className="sr-only">Your Company</span>
                    <img
                      src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                      alt=""
                      className="h-8 w-auto"
                    />
                  </a>

                  <div className="flex flex-1 items-center justify-end">
                    <a href="#" className="hidden text-sm font-medium text-gray-700 hover:text-gray-800 lg:block">
                      Search
                    </a>

                    <div className="flex items-center lg:ml-8">
                      {/* Help */}
                      <a href="#" className="p-2 text-gray-400 hover:text-gray-500 lg:hidden">
                        <span className="sr-only">Help</span>
                        <QuestionMarkCircleIcon className="h-6 w-6" aria-hidden="true" />
                      </a>
                      <a href="#" className="hidden text-sm font-medium text-gray-700 hover:text-gray-800 lg:block">
                        Help
                      </a>

                      {/* Cart */}
                      <div className="ml-4 flow-root lg:ml-8">
                        <a href="#" className="group -m-2 flex items-center p-2">
                          <ShoppingBagIcon
                            className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                            aria-hidden="true"
                          />
      
                          <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">0</span>
                          <span className="sr-only">items in cart, view bag</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  )
}
