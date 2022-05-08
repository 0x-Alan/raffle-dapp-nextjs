import { useMoralis, useWeb3Contract } from "react-moralis";
import { abi } from "../constants/abi.json";
import {useState, useEffect} from "react"

const CONTRACT_ADDRESS = "0x6030eb5A57814c1ae9E4d3630267Dc98460AF63A";

export default function LotteryEntrance() {
  const {isWeb3Enabled} = useMoralis()
  const [recentWinner, setRecentWinner] = useState("0");

  // Raffle Button
  const { runContractFunction: enterRaffle } = useWeb3Contract({
    abi: abi,
    contractAddress: CONTRACT_ADDRESS,
    functionName: "enterRaffle",
    msgValue: "1000000000000000000", // 0.1 eth
    params: {},
  });

  // View functions
  const { runContractFunction: getRecentWinner } = useWeb3Contract({
    abi: abi,
    contractAddress: CONTRACT_ADDRESS,
    functionName: "s_recentWinner",
    params: {},
  })

  useEffect(() => {
    async function updateUi() {
      const recentWinnerFromCall = await getRecentWinner();
      setRecentWinner(recentWinnerFromCall);
    }
    if(isWeb3Enabled) {
    }
  }, [isWeb3Enabled])

  return (
    <div>
      <button
        className="rounded ml-auto font-bold bg-pink-500"
        onClick={async () => {
          await enterRaffle();
        }}
      >
        Enter raffle
      </button>
      <div>The recent winner is: {recentWinner}</div>
    </div>
  );
}
