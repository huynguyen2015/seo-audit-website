"use client";

import LayoutCardLoadingComponent from "@/components/loading/layout-card-loading.component";
import { analyzeKeywords, findTopKeywords } from "@/utils/keyword-helper";
import { Button, Form, Steps, Tag } from "antd";
import Input from "antd/es/input/Input";
import { useState } from "react";

enum analyzeStep {
  init,
  analyze,
  finish,
}

export default function KeywordAnalyzeComponent({ limit = 30 }: any) {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [keywordsCount, setKeywordsCount] = useState<any>();
  const [focusKeywords, setFocusKeywords] = useState<any>();
  const [step, setStep] = useState<any>(-1);
  const [isFetchError, setIsFetchError] = useState(false);

  const steps = [
    {
      key: analyzeStep.init,
      title: "Collecting page information",
    },
    {
      key: analyzeStep.analyze,
      title: "Analyzing keywords",
    },
    {
      key: analyzeStep.finish,
      title: "Finish",
    },
  ];

  const items = steps.map((item) => ({ key: item.key, title: item.title }));

  const doSearch = async () => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    setStep(analyzeStep.init);
    const { url } = await form.getFieldsValue();
    if (!url || !url.length) return;

    // Read site map
    const urls = await fetch("/api/keyword/sitemap", {
      method: "POST",
      body: JSON.stringify({ url }),
    }).then(async (res) => {
      const data = await res.json();
      return data.results || [];
    });
    if (!urls || !urls.length) {
      setIsLoading(false);
      return;
    }

    // Limit to 20;
    let postUrls = urls.length > limit ? urls.slice(0, limit) : urls;

    // Read keywords
    setStep(analyzeStep.analyze);
    let postKeywords = await Promise.all(
      postUrls.map((postUrl: string) => readSiteMeta(postUrl))
    );

    const keywords = postKeywords.reduce((data, postKeyword) => {
      return [...data, ...postKeyword];
    }, []);
    if (!keywords || !keywords.length) {
      setIsLoading(false);
      return;
    }

    // Analyze keyword
    const kwCount = analyzeKeywords(keywords);
    setKeywordsCount(kwCount);
    const kwFocus = findTopKeywords(kwCount, 1);
    setFocusKeywords(kwFocus);

    setIsLoading(false);
    setStep(analyzeStep.finish);
  };

  const readSiteMeta = async (url: string) => {
    const keywords = await fetch("/api/keyword/meta", {
      method: "POST",
      body: JSON.stringify({ url }),
    })
      .then(async (res) => {
        const data = await res.json();
        return data.results || [];
      })
      .catch((_) => {
        setIsFetchError(true);
        return [];
      });

    return keywords;
  };

  return (
    <div className="flex flex-col space-y-6 px-5">
      <Form form={form} className="flex gap-4" layout="horizontal">
        <div className="w-full">
          <div className="flex flex-row gap-4">
            <div className="flex-1">
              <Form.Item name="url" label="Sitemap url">
                <Input placeholder="https://www.vietspace.com.vn/sitemap.xml" />
              </Form.Item>
            </div>
            <Button type="primary" onClick={doSearch} disabled={isLoading}>
              Analyze
            </Button>
          </div>
        </div>
      </Form>
      {step !== -1 && (
        <div className="px-12 pb-6">
          <Steps current={step} items={items} />
        </div>
      )}
      {isLoading && (
        <div className="flex flex-col gap-8">
          <LayoutCardLoadingComponent number={2} />
          <div className="flex gap-8">
            <LayoutCardLoadingComponent number={4} />
            <LayoutCardLoadingComponent number={4} />
          </div>
        </div>
      )}
      {keywordsCount &&
        !isLoading &&
        (focusKeywords.length === 0 ? (
          <div className="flex items-center justify-center">
            <div className="text-slate-500">
              Your keywords are playing hide and seek and right now,
              they&apos;re winning. But don&apos;t worry, our search team is on
              a coffee break and will be back to seek them out soon!
            </div>
          </div>
        ) : (
          <>
            <div>
              <div className="text-lg font-semibold text-slate-500">
                Focusing keywords
              </div>
              {Object.entries(keywordsCount)
                .filter(([key]) => focusKeywords.includes(key))
                .map(([key, value]: any, i) => {
                  return (
                    <Tag key={i} color={"green"} className="my-1">
                      <span className={"font-semibold"}>{key}:</span> {value}
                    </Tag>
                  );
                })}
            </div>
            <div>
              <div className="text-lg font-semibold text-slate-500">
                Another keywords
              </div>
              {Object.entries(keywordsCount)
                .filter(([key]) => !focusKeywords.includes(key))
                .map(([key, value]: any, i) => {
                  return (
                    <Tag key={i} className="my-1">
                      <span>{key}:</span> {value}
                    </Tag>
                  );
                })}
            </div>
          </>
        ))}
    </div>
  );
}
