import { get, getDatabase, orderByKey, query, ref } from "firebase/database";
import { useEffect, useState } from "react";

export default function useAnswers(videoID) {
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  //const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    async function fetchAnswers() {
      const db = getDatabase();
      const answersRef = ref(db, "answers/" + videoID + "/questions");
      const answersQuery = query(answersRef, orderByKey());

      try {
        setError(false);
        setLoading(true);
        const snapshot = await get(answersQuery);
        setLoading(false);
        if (snapshot.exists()) {
          //setHasMore(true);
          setAnswers(() => {
            return [...Object.values(snapshot.val())];
          });
        }
      } catch (err) {
        console.log(err);
        setLoading(false);
        setError(true);
      }
    }
    fetchAnswers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoID]);
  //const arrObj = Object.values(answerss);
  //console.log(answers);
  //console.log(`useAns answers are ${{ answers }}`);
  return {
    loading,
    answers,
    error,
    //hasMore,
  };
}
