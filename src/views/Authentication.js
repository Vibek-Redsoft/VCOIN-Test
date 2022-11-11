import AuthForm from "../components/AuthForm"

function Authentication({loading, login}) {
  return <AuthForm awaiting={loading} type={'view'} login={login} />
}

export default Authentication;
