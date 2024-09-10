import { Alert } from "@mui/material";

function ServerSideValidationMessagesWrapper({ error }) {
  return (
    <>
      {error && (
        <div id="error">
          {Object.keys(error).map((err, key) => (
            <Alert severity="error">
              {Array.isArray(error[err]) ? error[err][0] : error[err]}
            </Alert>
          ))}
        </div>
      )}
    </>
  );
}

export default ServerSideValidationMessagesWrapper;
