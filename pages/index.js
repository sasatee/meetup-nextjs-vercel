import MeetupList from "@/components/meetups/MeetupList";
import Head from "next/head";
import { connectToDatabase, closeConnection } from "../db/mongoConnection";

export default function HomePage(props) {
  return (
    <>
      <Head>
        <title>meetup</title>
        <meta name="description" content="Browse to our meetup page" />
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
}

// getServerSideProps for every request ===>explanation reference note below getStaticProps.txt

// export  async function getServerSideProps(context){
//  const req = context.req;
//  const res = context.res

//   return{
//     props:{
//       meetups:DUMMY_MEETUPS
//     }
//   }
// }

// explanation reference note below getStaticProps.txt

export async function getStaticProps() {
  // fetch data from an API

  const { db, client } = await connectToDatabase();

  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find().toArray();

  await closeConnection();
  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 10, // explanation reference note below Static_side_generation.txt
  };
}
