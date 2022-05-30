export default function UserProfilePage(props) {
  return (
    <div>
      <h1>{props.username}</h1>
      <p></p>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { params, req, res } = context;
  console.log({ req, res });
  return { props: { username: "Max" } };
}
