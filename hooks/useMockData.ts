import { Course } from '../types';

export const useMockData = (): Course[] => {
  return [
    {
      id: 1,
      title: 'PLC Programming Mastery',
      category: 'Industrial Automation',
      level: 'Intermediate',
      type: 'Pro',
      instructor: 'John Doe',
      description: 'From basics to advanced ladder logic and structured text for Siemens & Allen-Bradley PLCs.',
      price: 199.99,
      rating: 4.8,
      imageUrl: 'https://picsum.photos/seed/plc/600/400',
      modules: [
        {
          id: 'm1',
          title: 'Module 1: Introduction to PLCs',
          lessons: [
            { id: 'l1.1', title: 'What is a PLC?', videoUrl: 'https://www.youtube.com/embed/s_6qW2c2-bA', transcript: 'In this lesson, we introduce the concept of a Programmable Logic Controller (PLC) and its role in industrial automation. We will cover the basic components of a PLC system, including the CPU, input/output modules, and programming device.' },
            { id: 'l1.2', title: 'History and Evolution', videoUrl: 'https://www.youtube.com/embed/s_6qW2c2-bA', transcript: 'Explore the history of PLCs, from their invention in the late 1960s to their current state as powerful, networked controllers. We will discuss key milestones and technological advancements that have shaped the industry.' },
            { id: 'l1.3', title: 'PLC vs. Other Controllers', videoUrl: 'https://www.youtube.com/embed/s_6qW2c2-bA', transcript: 'This lesson compares PLCs with other control systems like relays, microcontrollers, and PCs. We will highlight the advantages of using PLCs in industrial environments, such as ruggedness, scalability, and ease of programming.' },
          ],
        },
        {
          id: 'm2',
          title: 'Module 2: Ladder Logic Fundamentals',
          lessons: [
            { id: 'l2.1', title: 'Basic Contacts and Coils', videoUrl: 'https://www.youtube.com/embed/s_6qW2c2-bA', transcript: 'Learn the fundamental building blocks of ladder logic programming: normally open (NO) and normally closed (NC) contacts, and output coils. We will create our first simple circuits.' },
            { id: 'l2.2', title: 'Timers and Counters', videoUrl: 'https://www.youtube.com/embed/s_6qW2c2-bA', transcript: 'Master the use of timer and counter instructions, which are essential for creating time-based and event-based logic in your automation programs.' },
          ],
        },
      ]
    },
    {
      id: 2,
      title: 'Advanced Robotics & Vision Systems',
      category: 'Industrial Automation',
      level: 'Advanced',
      type: 'Pro',
      instructor: 'Jane Smith',
      description: 'Integrate and program industrial robots with cutting-edge machine vision technology.',
      price: 249.99,
      rating: 4.9,
      imageUrl: 'https://picsum.photos/seed/robotics/600/400',
      modules: [
        { id: 'm1', title: 'Intro to Robotics', lessons: [{id: 'l1.1', title: 'Welcome', videoUrl: 'https://www.youtube.com/embed/s_6qW2c2-bA', transcript: 'Welcome to Advanced Robotics!'}]}
      ]
    },
    {
      id: 3,
      title: 'Power Electronics Fundamentals',
      category: 'Electrical Engineering',
      level: 'Beginner',
      type: 'Pro',
      instructor: 'Robert Brown',
      description: 'Understand converters, inverters, and their applications in modern power systems.',
      price: 179.99,
      rating: 4.7,
      imageUrl: 'https://picsum.photos/seed/power/600/400',
      modules: [
        { id: 'm1', title: 'Intro to Power Electronics', lessons: [{id: 'l1.1', title: 'Welcome', videoUrl: 'https://www.youtube.com/embed/s_6qW2c2-bA', transcript: 'Welcome to Power Electronics!'}]}
      ]
    },
    {
      id: 4,
      title: 'Microcontroller & Embedded Systems',
      category: 'Electrical Engineering',
      level: 'Intermediate',
      type: 'Pro',
      instructor: 'Emily White',
      description: 'Learn to design and program embedded systems using ARM Cortex-M microcontrollers.',
      price: 219.99,
      rating: 4.8,
      imageUrl: 'https://picsum.photos/seed/mcu/600/400',
       modules: [
        { id: 'm1', title: 'Intro to Embedded Systems', lessons: [{id: 'l1.1', title: 'Welcome', videoUrl: 'https://www.youtube.com/embed/s_6qW2c2-bA', transcript: 'Welcome to Embedded Systems!'}]}
      ]
    },
    {
      id: 5,
      title: 'React: The Complete Guide',
      category: 'IT',
      level: 'Beginner',
      type: 'Pro',
      instructor: 'Michael Green',
      description: 'Build modern, scalable web applications with React, Redux, and Next.js.',
      price: 149.99,
      rating: 4.9,
      imageUrl: 'https://picsum.photos/seed/react/600/400',
       modules: [
        { id: 'm1', title: 'Intro to React', lessons: [{id: 'l1.1', title: 'Welcome', videoUrl: 'https://www.youtube.com/embed/s_6qW2c2-bA', transcript: 'Welcome to React!'}]}
      ]
    },
    {
      id: 6,
      title: 'Cybersecurity for Developers',
      category: 'IT',
      level: 'Advanced',
      type: 'Pro',
      instructor: 'Sarah Black',
      description: 'Learn to write secure code and protect your applications from common vulnerabilities.',
      price: 299.99,
      rating: 4.9,
      imageUrl: 'https://picsum.photos/seed/security/600/400',
       modules: [
        { id: 'm1', title: 'Intro to Cybersecurity', lessons: [{id: 'l1.1', title: 'Welcome', videoUrl: 'https://www.youtube.com/embed/s_6qW2c2-bA', transcript: 'Welcome to Cybersecurity!'}]}
      ]
    },
    {
      id: 7,
      title: 'SCADA & HMI Design',
      category: 'Industrial Automation',
      level: 'Beginner',
      type: 'Free',
      instructor: 'David Gray',
      description: 'Create intuitive and effective HMI screens for industrial control systems.',
      price: 0,
      rating: 4.6,
      imageUrl: 'https://picsum.photos/seed/scada/600/400',
       modules: [
        { id: 'm1', title: 'Intro to SCADA', lessons: [{id: 'l1.1', title: 'Welcome', videoUrl: 'https://www.youtube.com/embed/s_6qW2c2-bA', transcript: 'Welcome to SCADA & HMI Design!'}]}
      ]
    },
    {
      id: 8,
      title: 'Cloud Computing with AWS',
      category: 'IT',
      level: 'Intermediate',
      type: 'Pro',
      instructor: 'Olivia Taylor',
      description: 'Master the fundamentals of cloud computing and become an AWS Certified Solutions Architect.',
      price: 199.99,
      rating: 4.8,
      imageUrl: 'https://picsum.photos/seed/aws/600/400',
       modules: [
        { id: 'm1', title: 'Intro to AWS', lessons: [{id: 'l1.1', title: 'Welcome', videoUrl: 'https://www.youtube.com/embed/s_6qW2c2-bA', transcript: 'Welcome to AWS Cloud Computing!'}]}
      ]
    }
  ];
};
