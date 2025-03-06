import { teams } from "../data/teamsData";
import "bootstrap/dist/css/bootstrap.min.css";

const NRRTable = () => {
    return (
      <div className="container-fluid mt-4">
        <div className="card shadow-lg">
          <div className="card-header bg-primary text-white text-center">
            <h4>Net Run Rate Table</h4>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-striped table-bordered text-center">
                <thead className="table-primary text-white">
                  <tr>
                    <th>Team</th>
                    <th>Matches</th>
                    <th>Won</th>
                    <th>Lost</th>
                    <th>NRR</th>
                    <th>Points</th>
                  </tr>
                </thead>
                <tbody>
                  {teams.map((team) => (
                    <tr key={team.id}>
                      <td>{team.name}</td>
                      <td>{team.matches}</td>
                      <td>{team.won}</td>
                      <td>{team.lost}</td>
                      <td className={team.nrr >= 0 ? "text-success" : "text-danger"}>
                        {team.nrr}
                      </td>
                      <td>{team.points}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  };

export default NRRTable;
