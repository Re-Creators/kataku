import React, { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Label,
} from "recharts";

import axios from "../axios";
import Spinner from "../components/Spinner";
const monthNames = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Augustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];
function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get("vocabularies/stats");
        setData(data);
        return data;
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);
  return (
    <div className="w-4/5 mx-auto mt-14 pb-10">
      <div className="">
        <h1 className="text-3xl font-bold">Selamat Pagi, Richardo</h1>
        <p className="text-gray-500 text-sm mt-2">
          Ini adalah ringkasan hasil belajarmu.
        </p>
      </div>
      {!data ? (
        <div className="w-full mt-10 flex items-center justify-center">
          <Spinner classSize="w-10 h-10" />
        </div>
      ) : (
        <>
          <div className="mt-8 flex flex-wrap gap-2 md:gap-10 justify-between md:justify-start">
            <div className="w-[48%] md:w-72 text-center py-10 px-3 bg-white shadow-md rounded-md">
              <h1 className="mb-2 font-bold text-base md:text-xl text-primary">
                Kosa Kata Hari ini
              </h1>
              <h2 className="font-semibold text-lg">{data?.today.length}</h2>
            </div>
            <div className="w-[48%] md:w-72 text-center py-10 px-3 bg-white shadow-md rounded-md">
              <h1 className="mb-2 font-bold text-base md:text-xl text-primary">
                Semua Kosa Kata
              </h1>
              <h2 className="font-semibold text-lg">{data?.all.total}</h2>
            </div>
            <div className="w-full  md:w-72 text-center py-10 px-3 bg-white shadow-md rounded-md">
              <h1 className="mb-2 font-bold text-base md:text-xl text-primary">
                Kosa Kata Sudah Dihafal
              </h1>
              <h2 className="font-semibold text-lg">30</h2>
            </div>
          </div>
          {data?.today.length > 0 && (
            <div className="mt-10">
              <h1 className="font-bold text-lg">Kosa Kata Baru</h1>
              <div className="flex gap-3 md:gap-8 mt-3 flex-wrap">
                {data?.today.map((vocabulary) => (
                  <div
                    className="w-full md:w-80 text-center py-10 px-5  bg-white shadow-md rounded-md"
                    key={vocabulary._id}
                  >
                    <h1 className="mb-2 font-bold text-base md:text-xl text-primary">
                      {vocabulary.english}
                    </h1>
                    <h2 className="font-semibold text-sm md:text-lg">
                      {vocabulary.indonesia}
                    </h2>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-10">
            <h1 className="font-bold text-lg">Kosa Kata 7 Hari Terakhir</h1>
            <div className="h-[300px] pt-10 mt-3 bg-white rounded-md">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={data.weekly}
                  margin={{
                    top: 30,
                    right: 30,
                    left: 10,
                    bottom: 20,
                  }}
                >
                  <CartesianGrid strokeDasharray="2 2" />
                  <XAxis dataKey="_id" stroke="#728aa1">
                    <Label
                      value="Tanggal"
                      offset={-10}
                      position="insideBottom"
                    />
                  </XAxis>
                  <YAxis
                    stroke="#728aa1"
                    label={{
                      value: "Kosa Kata",
                      angle: -90,
                      position: "insideLeft",
                    }}
                  />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="total"
                    stroke="#02a9ff"
                    fill="#3db4f2"
                    dot={{ strokeWidth: 2 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="mt-10">
            <h1 className="font-bold text-lg">Kosa Kata 1 Tahun Terakhir</h1>
            <div className="h-[300px] pt-10 mt-3 bg-white rounded-md">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={data.month.map((vocabulary) => {
                    vocabulary._id = monthNames[vocabulary._id - 1];
                    return vocabulary;
                  })}
                  margin={{
                    top: 30,
                    right: 30,
                    left: 10,
                    bottom: 20,
                  }}
                >
                  <CartesianGrid strokeDasharray="2 2" />
                  <XAxis dataKey="_id" stroke="#728aa1">
                    <Label value="Bulan" offset={-10} position="insideBottom" />
                  </XAxis>
                  <YAxis
                    stroke="#728aa1"
                    label={{
                      value: "Kosa Kata",
                      angle: -90,
                      position: "insideLeft",
                    }}
                  />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="total"
                    stroke="#02a9ff"
                    fill="#3db4f2"
                    dot={{ strokeWidth: 2 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
