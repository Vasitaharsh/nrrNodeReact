import { useState } from "react";
import axios from "axios";

const teams: string[] = [
  "Chennai Super Kings",
  "Royal Challengers Bangalore",
  "Delhi Capitals",
  "Rajasthan Royals",
  "Mumbai Indians",
];

const MatchDetails = () => {
  const [selectedTeam, setSelectedTeam] = useState<string>("");
  const [oppositionTeam, setOppositionTeam] = useState<string>("");
  const [matchOvers, setMatchOvers] = useState<string>("");
  const [desiredPosition, setDesiredPosition] = useState<string>("");
  const [tossResult, setTossResult] = useState<string>("");
  const [runsInput, setRunsInput] = useState<string>("");
  const [result, setResult] = useState<{ message: string; revisedNRR: number } | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!selectedTeam) newErrors.selectedTeam = "Please select your team.";
    if (!oppositionTeam) newErrors.oppositionTeam = "Please select the opposition team.";
    if (Number(matchOvers) !== 20) newErrors.matchOvers = "Match overs must be 20.";
    if (Number(desiredPosition) < 1 || Number(desiredPosition) > 5) newErrors.desiredPosition = "Desired position must be between 1 and 5.";
    if (!tossResult) newErrors.tossResult = "Please select the toss result.";
    if (!/^\d{1,3}$/.test(runsInput) || Number(runsInput) < 1 || Number(runsInput) > 999) {
      newErrors.runsInput = "Runs must be between 1 and 999.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    setResult(null);

    try {
      const { data } = await axios.post("http://localhost:3000/api/nrr/calculate", {
        yourTeam: selectedTeam,
        oppositionTeam,
        matchOvers: Number(matchOvers),
        desiredPosition: Number(desiredPosition),
        tossResult,
        runsInput: Number(runsInput),
      });

      setResult(data);
      setSelectedTeam("");
      setOppositionTeam("");
      setMatchOvers("");
      setDesiredPosition("");
      setTossResult("");
      setRunsInput("");
      setErrors({});
    } catch (err: any) {
      setErrors({ general: err.response?.data?.error || "Something went wrong!" });
    }
  };

  return (
    <div className="container-fluid mt-5">
      <h2 className="text-center mb-4">Net Run Rate Calculator</h2>
      {errors.general && <div className="alert alert-danger mt-3">{errors.general}</div>}
      {result && (
        <div className="card mt-3 shadow-lg">
          <div className="card-body">
            <h5 className="card-title text-success">NRR Calculation Result</h5>
            <p className="card-text"><strong>Message:</strong> {result.message}</p>
            <p className="card-text"><strong>Revised NRR:</strong> {result.revisedNRR}</p>
          </div>
        </div>
      )}
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <form className="card p-4 shadow-lg" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Your Team</label>
              <select className="form-select" value={selectedTeam} onChange={(e) => setSelectedTeam(e.target.value)}>
                <option value="">Select Your Team</option>
                {teams.map((team) => (
                  <option key={team} value={team}>{team}</option>
                ))}
              </select>
              {errors.selectedTeam && <div className="text-danger">{errors.selectedTeam}</div>}
            </div>
            <div className="mb-3">
              <label className="form-label">Opposition Team</label>
              <select className="form-select" value={oppositionTeam} onChange={(e) => setOppositionTeam(e.target.value)}>
                <option value="">Select Opposition Team</option>
                {teams.filter((team) => team !== selectedTeam).map((team) => (
                  <option key={team} value={team}>{team}</option>
                ))}
              </select>
              {errors.oppositionTeam && <div className="text-danger">{errors.oppositionTeam}</div>}
            </div>
            <div className="mb-3">
              <label className="form-label">How many overs match?</label>
              <input type="number" className="form-control" value={matchOvers} onChange={(e) => setMatchOvers(e.target.value)} />
              {errors.matchOvers && <div className="text-danger">{errors.matchOvers}</div>}
            </div>
            <div className="mb-3">
              <label className="form-label">Desired Position in Points Table</label>
              <input type="number" className="form-control" value={desiredPosition} onChange={(e) => setDesiredPosition(e.target.value)} />
              {errors.desiredPosition && <div className="text-danger">{errors.desiredPosition}</div>}
            </div>
            <div className="mb-3">
              <label className="form-label">Toss Result</label>
              <select className="form-select" value={tossResult} onChange={(e) => setTossResult(e.target.value)}>
                <option value="">Select Toss Result</option>
                <option value="Batting First">Batting First</option>
                <option value="Bowling First">Bowling First</option>
              </select>
              {errors.tossResult && <div className="text-danger">{errors.tossResult}</div>}
            </div>
            <div className="mb-3">
              <label className="form-label">Runs Scored / Runs to Chase</label>
              <input type="number" className="form-control" value={runsInput} onChange={(e) => setRunsInput(e.target.value)} />
              {errors.runsInput && <div className="text-danger">{errors.runsInput}</div>}
            </div>
            <button type="submit" className="btn btn-primary w-100">Calculate NRR</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MatchDetails;
