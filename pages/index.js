import Head from 'next/head';
import { MongoClient } from 'mongodb';
import MeetupList from '../components/meetups/MeetupList';

// const DUMMY_MEETUPS = [
//   {
//     id: 'm1',
//     title: 'Our First Meetup',
//     image:
//       'https://www.meetup.com/blog/wp-content/uploads/2020/08/holding-hands.jpg',
//     address: '5 Haruna Street Lagos',
//     description: 'Our first meetup is fixed',
//   },
//   {
//     id: 'm2',
//     title: 'Our Second Meetup',
//     image:
//       'https://cdn4.vectorstock.com/i/1000x1000/02/13/young-people-friends-cartoon-vector-24770213.jpg',
//     address: '5 Haruna Street Lagos',
//     description: 'Our Second meetup is fixed',
//   },
// ];

function HomePage(props) {
  return (
    <>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Browse a huge List of highly active React meetups"
        />
      </Head>
      <MeetupList meetups={props.meetups} />;
    </>
  );
}

// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;
//   // fetch data from an API

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }

export async function getStaticProps() {
  // fetch data from an API
  const client = await MongoClient.connect(
    'mongodb+srv://benchike:benedict10@cluster0.f4tplcu.mongodb.net/?retryWrites=true&w=majority'
  );
  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
      revaliate: 10,
    },
  };
}

export default HomePage;
