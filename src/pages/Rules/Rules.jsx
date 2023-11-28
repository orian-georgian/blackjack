import { useQuery } from "react-query";
import { RulesApis } from "../../apis";
import { Loader } from "../../components";

import "./Rules.scss";

export default function Rules() {
  const { data, error, isLoading } = useQuery(["rules"], () =>
    RulesApis.fetchRules()
  );

  if (error) {
    return "Damn, this is not good!";
  }

  return (
    <main className="bj-rules max-content-width">
      {isLoading && (
        <div className="bj-loader-container flex-box align-center justify-center">
          <Loader />
        </div>
      )}
      {!!data &&
        data.map((rule) => (
          <div className="bj-rule" key={rule.id}>
            <h2 className="heading-2">{rule.title}</h2>
            <p className="paragraph">{rule.description}</p>
          </div>
        ))}
    </main>
  );
}
