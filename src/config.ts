const deployed: boolean = false

interface Payload {
  endpoint:string,
  version:string
}

const prod : Payload = {
  endpoint: "https://us-central1-astrius-dev.cloudfunctions.net",
  version: "production",
};

const dev: Payload = {
  endpoint: "http://localhost:5001/astrius-dev/us-central1",
  version: "sandbox",
};

export const config: Payload = deployed ? prod : dev;
