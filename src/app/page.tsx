"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface StartupIdea {
  startupName: string;
  elevatorPitch: string;
  mvpFeatures: string[];
  pricingModel: string;
}

export default function Home() {
  const [domain, setDomain] = useState("");
  const [trend, setTrend] = useState("");
  const [audience, setAudience] = useState("");
  const [idea, setIdea] = useState<StartupIdea | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    setLoading(true);
    const res = await fetch("/api/idea", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ domain, trend, audience }),
    });
    const data = await res.json();
    setIdea(data.data);
    setLoading(false);
  }

  return (
    <main className="p-8 max-w-3xl mx-auto space-y-8">
      <h1 className="text-4xl font-extrabold text-center">Startup Idea Assistant</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4"
      >
        <div className="flex flex-col space-y-1">
          <Label htmlFor="domain">Domain</Label>
          <Input
            id="domain"
            placeholder="e.g. education"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
          />
        </div>

        <div className="flex flex-col space-y-1">
          <Label htmlFor="trend">Trend</Label>
          <Input
            id="trend"
            placeholder="e.g. AI"
            value={trend}
            onChange={(e) => setTrend(e.target.value)}
          />
        </div>

        <div className="flex flex-col space-y-1">
          <Label htmlFor="audience">Audience</Label>
          <Input
            id="audience"
            placeholder="e.g. freelancers"
            value={audience}
            onChange={(e) => setAudience(e.target.value)}
          />
        </div>

        <Button type="submit" disabled={loading} className="mt-4 sm:mt-0 sm:col-span-3">
          {loading ? "Generating…" : "Generate Idea"}
        </Button>
      </form>

      {idea && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>{idea.startupName}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>{idea.elevatorPitch}</p>
            <h3 className="text-lg font-medium">MVP Features:</h3>
            <ul className="list-disc list-inside space-y-1">
              {idea.mvpFeatures?.map((f: string, i: number) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
            <p className="text-sm text-muted-foreground">Pricing Model: {idea.pricingModel}</p>
          </CardContent>
        </Card>
      )}
    </main>
  );
}
