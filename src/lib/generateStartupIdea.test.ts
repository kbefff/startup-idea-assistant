import { generateStartupIdea } from "./generateStartupIdea";

jest.mock("openai", () => {
  return {
    __esModule: true,
    default: jest.fn().mockImplementation(() => ({
      chat: {
        completions: {
          create: jest.fn().mockResolvedValue({
            choices: [
              {
                message: {
                  content: JSON.stringify({
                    startupName: "TestCo",
                    elevatorPitch: "A test pitch",
                    mvpFeatures: ["f1", "f2"],
                    pricingModel: "Free tier",
                    competitiveEdge: "Test edge",
                    whyNow: "Because tests",
                  }),
                },
              },
            ],
          }),
        },
      },
    })),
  };
});

describe("generateStartupIdea", () => {
  it("returns parsed data on success", async () => {
    const res = await generateStartupIdea({
      domain: "education",
      trend: "AI",
      audience: "freelancers",
    });
    expect(res.success).toBe(true);
    expect(res.data.startupName).toBe("TestCo");
    expect(res.data.mvpFeatures).toEqual(["f1", "f2"]);
  });
});
