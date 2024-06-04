"use client";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import va from "@vercel/analytics";
import { FaYoutube } from "react-icons/fa";
import { ChevronDownIcon } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Switch } from "~/components/ui/switch";
import { BsPlayFill } from "react-icons/bs";
// import { ReactMic } from "~/lib/react-mic";
import {AudioRecorder, useAudioRecorder} from 'react-audio-voice-recorder';
import { useDropzone } from "react-dropzone";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import relativeTime from "dayjs/plugin/relativeTime";
import { KeyFinder, AudioData, key_t } from "~/lib/key_finder/src";
import { Steps, Step } from 'intro.js-react';

// Components
import AppContainer from "~/app/(app)/components/AppContainer";
// import WaveformAudioPlayer from "~/app/(app)/components/WaveformAudioPlayer";
const WaveformAudioPlayer = React.lazy(() => import('~/app/(app)/components/WaveformAudioPlayer'));
import Spinner from "~/core/ui/Spinner";
import { DropdownSelector } from "~/app/(app)/generate/components/dropdrown-selector-v2";

// Images & Icons
import malePopImage from "~/../public/images/male-pop.jpg";
import defaultModelImage from "~/../public/images/girl-singing-model.png";
import greenMaleSinger from "~/../public/images/green-male-singer.png";
import { MdNoiseAware } from "react-icons/md";
import { HiMiniSparkles } from "react-icons/hi2";

// Hooks
import useUserId from "~/core/hooks/use-user-id";
import useGetAudioConversions from "~/lib/audio_conversions/hooks/use-get-audio-conversions";
import useGetModels from "~/lib/models/hooks/use-get-models";
import useGetModelById from "~/lib/models/hooks/use-get-model-by-id";
import useSupabase from "~/core/hooks/use-supabase";
import useCurrentOrganization from "~/lib/organizations/hooks/use-current-organization";
import useApiKey from "~/core/hooks/use-api-key";

// Misc
import { RiLoader2Fill } from "react-icons/ri";
import { formatTime, getModelAudioUrl } from "~/lib/utils";
import { useGlobalState } from "~/lib/contexts/GlobalStore";
import { convertWebmToMp3 } from "~/lib/audio_conversions/utils";

// Plugins
dayjs.extend(relativeTime);
dayjs.extend(utc);
type AcceptableFileType = '.wav' | '.mp3' | '.ogg' | '.flac';

export function ConvertPage(props: any, searchParams: any) {
	// Hooks and States: Organized by Purpose
	const client = useSupabase();
	const userId = useUserId();
	const apiKey = useApiKey();
	const organization = useCurrentOrganization();
	const [state, dispatch] = useGlobalState();

	const recorderControls = useAudioRecorder();
	
	const modelsData = useGetModels();

	const modelData = props.modelId ? useGetModelById(props.modelId) : null;
	const { data: audioConversions = [], isValidating: isFetchingConversions, mutate: mutateAudioConversions } = useGetAudioConversions(10);
	// UI States
	const [uiStates, setUiStates] = useState({
		isShowingList: false,
		isShowingModal: false,
		isShowingAdvancedSettings: false,
		isShowingPreviousOutputs: false,
	});
	const [selectedTab, setSelectedTab] = useState("Voice");
	const [creditsError, setCreditsError] = useState(false);
	const [searchTerm, setSearchTerm] = useState<any>(null);
	const [searchResults, setSearchResults] = useState<any>([]);
	const [shouldLoadAllConversionHistory, setShouldLoadAllConversionHistory] = useState(false);
	const [isManuallyFetchingConversions, setIsManuallyFetchingConversions] = useState(false);

	const [algorithm, setAlgorithm] = useState<any>("hybrid[rmvpe+pm+mangio-crepe+dio]");
	const [audioDuration, setAudioDuration] = useState<number | null>(null);
	const [fileUrl, setFileUrl] = useState(null);
	const [generations_count, setGenerationsCount] = useState(1);
	const [selectedAudioFile, setSelectedAudioFile] = useState<any>(null);
	const [selectedFile, setSelectedFile] = useState<any>(null);
	const [selectedModel, setSelectedModel] = useState<any>(null);
	const [taskId, setTaskId] = useState(null);
	const [youtubeLink, setYoutubeLink] = useState<string>("");

	// Upload States
	const [uploadProgress, setUploadProgress] = useState(0);
	const [uploading, setUploading] = useState(false);
	const [uploadSuccess, setUploadSuccess] = useState(false);
	const [uploadError, setUploadError] = useState(false);
	const [revocalizeFailed, setRevocalizeFailed] = useState<boolean>(false);
	const [recentVoices, setRecentVoices] = useState(0);

	// Audio Conversion Settings
	const [transpose, setTranspose] = useState<any>(0);
	const [noiseGate, setNoiseGate] = useState<boolean>(false);
	const [highPass, setHighPass] = useState<boolean>(false);
	const [lowPass, setLowPass] = useState<boolean>(false);
	const [preprocessCompressor, setPreprocessCompressor] = useState<boolean>(false);
	const [compressor, setCompressor] = useState<boolean>(false);
	const [chorus, setChorus] = useState<boolean>(false);
	const [reverb, setReverb] = useState<boolean>(false);
	const [delay, setDelay] = useState<boolean>(false);
	const [conversionStrength, setConversionStrength] = useState<number>(0);
	const [modelVolume, setModelVolume] = useState<number>(0);
	const [autoDetectKey, setAutoDetectKey] = useState<boolean>(true);
	const [songKey, setSongKey] = useState<string>("C");
	const [songScale, setSongScale] = useState<string>("major");
	const [autoTune, setAutoTune] = useState<boolean>(false);
	const [isolateVocals, setIsolateVocals] = useState<boolean>(false);
	const [harmony, setHarmony] = useState<boolean>(false);
	const [harmonyType, setHarmonyType] = useState<string>("third");
	const [audioUrl, setAudioUrl] = useState<any>(null);

	// Loading and Error States
	const [loading, setLoading] = useState<any>(false);
	const [taskStatus, setTaskStatus] = useState<any>(null);
	const [errorMessage, setErrorMessage] = useState<any>(null);

	// Onboarding
	const [stepsEnabled, setStepsEnabled] = useState<boolean>(false);
	const [initialStep, setInitialStep] = useState<number>(0);
	const [steps, setSteps] = useState<Step[]>(
		[
			{
				element: ".step1",
				intro: "Select a model to get started",
				position: 'left'
			},
			{
				element: ".step2",
				intro: "Upload acapella and Revocalize",
				position: 'top'
			},
			{
				element: ".step3",
				intro: "View converted voices",
				position: 'top'
			}
		]
	)
	const onExit = (): void => {
		if (stepsEnabled === true) {
			localStorage.setItem('hasVisited', 'true');
			setStepsEnabled(false);
		}
	};

	useEffect(() => {
		const hasVisited = localStorage.getItem('hasVisited');
		if (!hasVisited) {
			setStepsEnabled(true);
		}
	}, []);

	// Utils and Effects
	const listRef = useRef(null) as any;
	const buttonRef = useRef(null) as any;
	const gradients = [
		"background: linear-gradient(120deg, #FF00C7 0%, #51003F 100%), linear-gradient(120deg, #0030AD 0%, #00071A 100%), linear-gradient(180deg, #000346 0%, #FF0000 100%), linear-gradient(60deg, #0029FF 0%, #AA0014 100%), radial-gradient(100% 165% at 100% 100%, #FF00A8 0%, #00FF47 100%), radial-gradient(100% 150% at 0% 0%, #FFF500 0%, #51D500 100%); background-blend-mode: overlay, color-dodge, overlay, overlay, difference, normal;",
		"background: linear-gradient(238.72deg, #0044A9 0%, #F700A3 100%), radial-gradient(100% 188.01% at 76.14% 0%, #43DDFF 0%, #FF0000 100%), linear-gradient(0deg, #DB00FF 0%, #14FF00 100%), radial-gradient(59.2% 100% at 50% 100%, #6A00D5 0%, #00E0FF 100%), radial-gradient(100% 148.07% at 0% 0%, #FF9900 0%, #001AFF 100%); background-blend-mode: hard-light, overlay, color-burn, color-burn, normal;",
		"background: linear-gradient(129.96deg, #FF2F2F 10.43%, #000460 92.78%), radial-gradient(100% 246.94% at 100% 0%, #FFFFFF 0%, #020063 100%), linear-gradient(58.72deg, #2200F2 0%, #530000 100%), linear-gradient(154.03deg, #B70000 0%, #FF003D 74.04%), linear-gradient(341.1deg, #FF0000 7.52%, #0038FF 77.98%), linear-gradient(136.23deg, #00C2FF 11.12%, #FF0000 86.47%), radial-gradient(57.37% 100% at 50% 0%, #B50000 0%, #0034BB 100%); background-blend-mode: overlay, color-burn, screen, overlay, difference, difference, normal;",
		"background: radial-gradient(140% 107.13% at 50% 10%,transparent 37.41%,#63e 70.27%,#fff 100%); background-blend-mode: normal;",
		"background: linear-gradient(0deg, #004DA8 0%, #000000 100%), linear-gradient(238.72deg, #011662 0%, #FFFFFF 100%), linear-gradient(301.28deg, #FF876C 0%, #005B83 51.04%, #030098 100%), radial-gradient(100% 200% at 0% 0%, #FFFFFF 0%, #2400B4 100%), linear-gradient(133.98deg, #FF0000 30.43%, #00A3FF 100%), radial-gradient(70.41% 100% at 50% 0%, #DBDF00 0%, #2200AA 100%); background-blend-mode: overlay, soft-light, color-dodge, darken, difference, normal;",
		"background: linear-gradient(126.95deg, #91A2CD 0%, #008716 51.69%, #FF9900 100%), linear-gradient(126.95deg, #FFFFFF 0%, #00273D 49.48%, #FF9900 100%), radial-gradient(100% 216.55% at 100% 100%, #A4BE00 0%, #6100FF 100%), linear-gradient(307.27deg, #1DAC92 0.37%, #2800C6 100%), radial-gradient(100% 140% at 100% 0%, #EAFF6B 0%, #006C7A 57.29%, #2200AA 100%); background-blend-mode: overlay, overlay, difference, difference, normal;",
		"background: linear-gradient(301.28deg, #630000 0%, #000000 100%), linear-gradient(121.28deg, #207A00 0%, #950000 100%), linear-gradient(238.72deg, #FFB800 0%, #000000 100%), linear-gradient(238.72deg, #00D1FF 0%, #A80000 100%), linear-gradient(58.72deg, #B80000 0%, #1B00C2 100%), linear-gradient(125.95deg, #00E0FF 10.95%, #87009D 100%), linear-gradient(263.7deg, #B60000 3.43%, #B100A0 96.57%), linear-gradient(320.54deg, #800000 0%, #00C2FF 72.37%), linear-gradient(130.22deg, #8FA600 18.02%, #5A31FF 100%); background-blend-mode: overlay, color-dodge, difference, lighten, difference, color-dodge, difference, difference, normal;",
		"background: linear-gradient(328.78deg, #030086 14.45%, #BD6177 84.36%), linear-gradient(301.28deg, #209B4A 0%, #7000FF 100%), radial-gradient(100% 138.56% at 100% 0%, #D50000 0%, #00FFE0 100%), radial-gradient(100% 148.07% at 0% 0%, #D50000 0%, #00FFFF 100%); background-blend-mode: soft-light, overlay, difference, normal;",
		"background: radial-gradient(111% 111% at 74.29% -11%, #A90000 0%, #027000 100%), linear-gradient(127.43deg, #B7D500 0%, #2200AA 100%); background-blend-mode: difference, normal;",
		"background: linear-gradient(121.28deg, #0E5432 0%, #D6AD96 100%), linear-gradient(121.28deg, #FF0000 0%, #FFBABA 100%), linear-gradient(140.54deg, #7000FF 0%, #0015D1 72.37%), linear-gradient(307.43deg, #FFE927 0%, #00114D 100%), radial-gradient(107% 142.8% at 15.71% 104.5%, #FFFFFF 0%, #A7AA00 100%), #FFFFFF; background-blend-mode: overlay, overlay, difference, difference, difference, normal;",
	];
	const randomGradient = useMemo(() => (selectedModel && selectedModel.id ? gradients[parseInt(selectedModel.id, 10) % gradients.length] : gradients[Math.floor(Math.random() * gradients.length)]), [selectedModel]);

	// Functions
	function resetAll() {
		setAudioUrl(null);
		setSelectedFile(null);
		setAudioDuration(null);
		setUploading(false);
		setUploadSuccess(false);
		setUploadError(false);
		setAudioUrl(null);
		setSelectedAudioFile(null);
		// Conversion Settings
		setTranspose(0);
		setPreprocessCompressor(false);
		setNoiseGate(false);
		setLowPass(false);
		setHighPass(false);
		setChorus(false);
		setCompressor(false);
		setReverb(false);
		setDelay(false);
		setSongKey("C");
		setSongScale("major");
		setAutoTune(false);
		setHarmony(false);
		setHarmonyType("third");
		setAudioDuration(null);
	}

	// Audio Recording
	const [isRecording, setIsRecording] = useState(false);
	const handleStartRecording = () => {
		setIsRecording(true);
		recorderControls.startRecording();
	};
	const handleStopRecording = () => {
		setIsRecording(false);
		recorderControls.stopRecording();
	};
	const onStoppedRecording = async (recordedBlob: Blob) => {
		recordedBlob = await convertWebmToMp3(recordedBlob);
		setSelectedFile(null);
		setAudioUrl(URL.createObjectURL(recordedBlob));
		setSelectedAudioFile(recordedBlob);
		const file = recordedBlob;
		const filenameBase = encodeURIComponent(`${dayjs().format("YYYY-MM-DD_HH:mm:ss")}_web_recording`)
			.replace(/[^a-z0-9]/gi, "_")
			.toLowerCase();
		const filename = `${filenameBase}.mp3`;
		const fileType = encodeURIComponent(file.type);
		const audioContext = new (window.AudioContext || window.AudioContext)();
		const arrayBuffer = await new Response(recordedBlob).arrayBuffer();
		const audioBuffer =  audioContext.decodeAudioData(arrayBuffer);
		const duration = (await audioBuffer).duration; // Convert to seconds
		setAudioDuration(Math.round(duration));
		console.log(duration, 'duration', audioUrl, 'audio Url')
		const [_, key] = await Promise.all([uploadAudioToS3(file, filename, fileType), getKeyFromAudio(recordedBlob)]);
	};

	// Image and Model Data
	const images = [malePopImage.src, defaultModelImage.src, greenMaleSinger.src];

	const modelsDataModified = useMemo(() =>
		modelsData?.data?.sort((a, b) => a.created_at! < b.created_at! ? 1 : -1).map((item, index) => ({ ...item, image: images[index % images.length] })) as any
		, [modelsData?.data]);

	// Use Effect Hooks
	useEffect(handleDefaultModelSelection, [modelsData.data, props.modelId]);
	useEffect(handleClicksOutsideOfModelList, []);
	useEffect(handleTaskStatusChanges, [taskId]);
	useEffect(handleSearchTermChanges, [searchTerm]);
	useEffect(handleTaskCompletion, [taskStatus]);
	useEffect(handleAudioConversionsRefresh, [audioConversions]);
	useEffect(() => {
		if (!uiStates?.isShowingList) {
			setSearchTerm(selectedModel?.name)
		} else {
			setSearchTerm("")
		}
	}, [uiStates?.isShowingList, selectedModel])
	const isYouTubeLinkValid = (url: string) => isValidYouTubeLink(url);
	const handleYoutubeLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => updateYouTubeLink(e.target.value);
	const handleUploadAudio = async (e: any) => await uploadAudio(e);
	const uploadAudioToS3 = async (file: any, filename?: string, fileType?: string) => await uploadToS3(file, filename, fileType);
	const handleStartGeneration = async () => await startGeneration();
	const handleModelSelection = useCallback((item: any) => updateModelSelection(item), []);

	// Helper Functions
	function handleDefaultModelSelection() {
		// If there is data and no modelId prop, set the selected model to the first model in the data
		if (!modelsData.isLoading && !modelsData.isValidating && modelsData.data && !props.modelId) {

			const firstModel = modelsData.data[0];
			setSelectedModel(firstModel);
			setSearchTerm(firstModel?.name);
		}
		// If there is a modelId prop, set the selected model to the model with the matching id
		else if (props.modelId && modelsData?.data && Array.isArray(modelsData.data)) {
			const selectedModel = modelsData.data.filter((model) => (model.id == props.modelId))[0]
			setSelectedModel(selectedModel);
			setSearchTerm(selectedModel?.name);
		}
	}
	function handleClicksOutsideOfModelList() {
		// Handle clicks outside of the model dropdown list
		if (typeof window === "undefined") return;
		const handleOutsideClick = (event: any) => {
			if (listRef.current && !listRef.current.contains(event.target) && buttonRef.current && !buttonRef.current.contains(event.target)) setUiStates((prev) => ({ ...prev, isShowingList: false }));
		};
		window.addEventListener("click", handleOutsideClick);
		return () => {
			window.removeEventListener("click", handleOutsideClick);
		};
	}
	function handleTaskStatusChanges() {
		let intervalId: any;
		// Check if task ID exists
		if (taskId) {
			const fetchTaskStatus = async () => {
				try {
					const res = await fetch(`/api/check-task/${taskId}`);
					const data = await res.json();
					setTaskStatus(data);
					// If task is not in progress or waiting in queue, stop fetching task status
					if (data.status !== "in_progress" && data.status !== "waiting") {
						clearInterval(intervalId);
						// Moved the credits deduction to the backend
						// if (data.status == "completed") {
						// 	await deductOrganizationBalance(client, {
						// 		balance: Number((Number(audioDuration) / 60).toPrecision(2)),
						// 		id: organization?.id,
						// 	};
						// }
						if (data.status === 'failed') {
							// console.log("achieved failed status")
							setRevocalizeFailed(data.error ? data.error : true);
							setLoading(false);
						}

					}
				} catch (error) {
					console.error(error);
				}
			};
			fetchTaskStatus();
			// Set interval to fetch task status every 2 seconds
			intervalId = setInterval(fetchTaskStatus, 2000);
		}
		return () => {
			clearInterval(intervalId);
		};
	}
	function handleTaskCompletion() {
		// Initiate the refresh of audio conversions
		if (taskStatus && taskStatus.status === "completed") {
			setIsManuallyFetchingConversions(true);
			mutateAudioConversions();
		}
	}
	function handleAudioConversionsRefresh() {
		if (audioConversions?.length > 0 && taskStatus?.status === "completed") {
			setLoading(false);
			setIsManuallyFetchingConversions(false);
			setTaskId(null);
			setTaskStatus(null);
		}
	}
	function handleSearchTermChanges() {
		const results = modelsDataModified?.filter((item: any) => item?.name.toLowerCase().includes(searchTerm?.toLowerCase()));
		setSearchResults(results);
	}

	function isValidYouTubeLink(url: string) {
		const regex = /^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/.test(url);
		const shortUrlRegex = /^(http(s)?:\/\/)?youtu\.be\/[a-zA-Z0-9-_]{11}\?si=.+/.test(url);
		const mobileUrlRegex = /^(http(s)?:\/\/)?m\.youtube\.com\/watch\?si=.+&v=[a-zA-Z0-9-_]{11}&feature=youtu\.be/.test(url);
		if (!regex && !shortUrlRegex && !mobileUrlRegex) return false;
		const urlParams = new URLSearchParams(new URL(url).search);
		const id = urlParams.get("v") || new URL(url).pathname.split("/")[1];
		if (!id) return false;
		const idValid = /^[a-zA-Z0-9-_]{11}$/.test(id);
		return idValid;
	}
	function updateYouTubeLink(inputValue: string) {
		setYoutubeLink(inputValue);
		if (isYouTubeLinkValid(inputValue)) {
			// Strip unwanted params from the URL
			const url = new URL(inputValue);
			const urlParams = new URLSearchParams(url.search);
			const id = urlParams.get("v") || url.pathname.split("/")[1];
			const newUrl = `https://www.youtube.com/watch?v=${id}`;
			setYoutubeLink(newUrl);
		}
	}
	async function uploadAudio(e: any) {
		setErrorMessage("");
		if (!userId) {
			setUiStates((prev) => ({ ...prev, isShowingModal: true }));
			return;
		}
		if (e.length > 1) {
			setErrorMessage("Please upload only one file at a time.");
			return;
		}
		if (e.length === 0) {
			setErrorMessage("Please upload a valid audio file.");
			return;
		}

		const file = e[0];
		console.log(file, 'file')
		const fileType = file.type.split("/")[0];
		if (fileType !== 'audio') {
			setErrorMessage("Please upload a valid audio file.");
			return;
		}
		const audioBlob = new Blob([file], { type: "audio/webm" });
		const audioURL = URL.createObjectURL(audioBlob);
		const audio = new Audio(audioURL);
		audio.onloadedmetadata = function () {
			console.log("Audio duration: ", audio.duration);
			setAudioDuration(Math.round(audio.duration));
		};
		setAudioUrl(null);
		setSelectedFile(audioURL);
		setSelectedAudioFile(file);

		console.log("Finding key and uploading to S3...");
		const [_, key] = await Promise.all([uploadAudioToS3(file), getKeyFromAudio(audioBlob)]);
	}
	async function getKeyFromAudio(audioBlob: any) {
		try {
			const audioContext = new (window.AudioContext || window.AudioContext)();
			const arrayBuffer = await new Response(audioBlob).arrayBuffer();
			const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
			console.log("Audio Buffer: ", audioBuffer);
			const audioData = new AudioData();
			audioData.setSamplesFromAudioBuffer(audioBuffer);
			const keyFinder = new KeyFinder();
			const key = keyFinder.keyOfAudio(audioData);
			console.log(KeyFinder.friendlyKeyMapping);
			if (KeyFinder.friendlyKeyMapping[key]) {
				console.log("Key found in friendlyKeyMapping: ", KeyFinder.friendlyKeyMapping[key]);
				let parsedKey = KeyFinder.friendlyKeyMapping[key].split("_")[0];
				let parsedScale = KeyFinder.friendlyKeyMapping[key].split("_")[1].toLowerCase();
				// Handle the case when the key is a flat major
				if (parsedScale === "flat major") {
					parsedKey = parsedKey + "# / " + String.fromCharCode(parsedKey.charCodeAt(0) + 1);
					parsedScale = "major";
				}
				setSongKey(parsedKey || "");
				setSongScale(parsedScale || "");
				setAutoDetectKey(true);
				console.log("Detected key and scale: ", parsedKey, parsedScale);
			} else console.error("Key not found in friendlyKeyMapping");
			return key;
		} catch (error) {
			console.error("decodeAudioData error", error);
		}
	}

	async function uploadToS3(file: any, filename?: string, fileType?: string) {
		setUploading(true);
		setUploadSuccess(false);
		setUploadError(false);
		if (!filename) filename = encodeURIComponent(file.name);
		if (!fileType) fileType = encodeURIComponent(file.type);
		const res = await fetch(`/api/upload-file?file=${filename}&fileType=${fileType}`);
		const { s3_url, url, fields } = await res.json();
		const formData = new FormData();
		Object.entries({ ...fields, file }).forEach(([key, value]) => {
			formData.append(key, value as string);
		});
		const xhr = new XMLHttpRequest();
		xhr.open("POST", url, true);
		xhr.upload.onprogress = function (e) {
			if (e.lengthComputable) {
				const percentCompleted = Math.round((e.loaded * 100) / e.total);
				setUploadProgress(percentCompleted);
			}
		};
		xhr.onload = function () {
			setUploading(false);
			if (xhr.status === 200 || xhr.status === 204) {
				setUploadSuccess(true);
				setUploadProgress(0);
				setFileUrl(s3_url);
				va.track("Uploaded Audio", { file_format: file.type });
			} else {
				setUploadError(true);
				setUploadProgress(0);
			}
		};
		xhr.send(formData);
	}

	async function startGeneration() {
		setRevocalizeFailed(false)
		if (!userId) {
			console.log("User is not logged in");
			setUiStates((prev) => ({ ...prev, isShowingModal: true }));
		} else {
			if (Math.ceil(Number(audioDuration) / 60) < (organization?.credits || 0)) {
				setCreditsError(false)
				if (selectedTab === "YouTube" && !youtubeLink) {
					setErrorMessage("Please provide a valid YouTube link.");
					return;
				} else if (selectedTab === "Voice" && !(audioUrl || selectedAudioFile)) {
					setErrorMessage("Please provide a valid audio file.");
					return;
				}
				if (!selectedModel || !selectedModel?.id) {
					console.log(selectedModel);
					setErrorMessage("Please select a voice model.");
					return;
				}
				setErrorMessage("");
				setTaskStatus(null);
				setLoading(true);

				// Set conversion request settings
				const formData = new FormData();
				const settings = {
					...(selectedTab === "YouTube" ? { youtube_url: youtubeLink } : { s3_url: fileUrl }),
					model: selectedModel?.id || "",
					transpose: transpose?.toString() || "",
					algorithm: algorithm || "",
					isolateVocals: isolateVocals?.toString() || "",
					generations_count: generations_count?.toString() || "",
					preprocess_effects: JSON.stringify({
						...(noiseGate ? { noiseGate } : {}),
						...(highPass ? { highPass } : {}),
						...(lowPass ? { lowPass } : {}),
						...(preprocessCompressor ? { preprocessCompressor } : {}),
					}),
					effects: JSON.stringify({
						...(compressor ? { compressor } : {}),
						...(chorus ? { chorus } : {}),
						...(reverb ? { reverb } : {}),
						...(delay ? { delay } : {}),
					}),
					key: songKey,
					scale: songScale,
					autoTune: autoTune?.toString() || "",
					...(harmony ? { harmony: harmonyType } : {}),
				};
				Object.entries(settings).forEach(([key, value]) => { if (value) formData.append(key, typeof value === "object" ? JSON.stringify(value) : value) });
				try {
					va.track("Started Conversion", { model_name: selectedModel?.name, user_id: userId });
					// console.log("API Key: ", apiKey)
					// Scroll to top of page animation
					if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
					const response = await fetch("/api/revocalize", {
						method: "POST",
						headers: {
							Authorization: `Bearer ${apiKey}`,
						},
						body: formData,
					});
					if (response.ok) {
						const data = await response.json();
						const { task_id } = data;
						setTaskId(task_id);

						va.track("Successful Conversion", { model_name: selectedModel?.name, user_id: userId });
					} else {
						setErrorMessage("Error uploading audio file. Please try again.");
					}
				} catch (error) {
					console.error(error);
					setErrorMessage("Error uploading audio file. Please try again.");
				}
			} else {
				setCreditsError(true)
			}
		}
	}

	// console.log((Number(audioDuration) / 60), "audiolength")

	function updateModelSelection(item: any) {
		setSelectedModel(item);
		setSearchTerm(item?.name);
		setUiStates((prev) => ({ ...prev, isShowingList: false }));
	}

	// FIle Dropzone
	const { getRootProps, getInputProps, inputRef } = useDropzone({
		onDrop: handleUploadAudio,
		// @ts-ignore:next-line
		accept: {
			'audio/mp3': ['.wav', '.mp3', '.ogg', '.flac'],
		},
		maxFiles: 1,
		multiple: false
	});

	const recentModels = useMemo(() => {
		const models = (audioConversions || []).map(conversions => (conversions.model));
		if (models.length > 0) {
			let filteredModels = models.filter(model => model !== undefined); // Filter out undefined models
			let uniqueModels = Array.from(new Set(filteredModels.map(model => JSON.stringify(model, (key, value) => value === undefined ? null : value)))).map(model => JSON.parse(model));
			setRecentVoices(uniqueModels.length);
			setRecentVoices(uniqueModels.length)
			if (uniqueModels.length > 2) {
				uniqueModels = uniqueModels.slice(0, 2);
			}
			return uniqueModels
		} else {
			return [];
		}

	}, [audioConversions]);

	return (
		<AppContainer>
			<div className="px-3 mt-0 mb-4 rounded-xl md:px-0">
				<Steps
					enabled={stepsEnabled}
					steps={steps}
					initialStep={initialStep}
					onExit={onExit}
					options={{
						nextToDone: true,
						doneLabel: "Done",
						showBullets: false
					}}
				/>
				{uiStates.isShowingModal && (
					<AnimatePresence mode="wait">
						<motion.div className="fixed top-0 bottom-0 left-0 right-0 z-50 w-full h-full bg-black-700/80" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.3 }} onClick={() => setUiStates((prev) => ({ ...prev, isShowingModal: false }))}>
							<div className="flex flex-col items-center justify-center w-full h-full">
								<div className="w-[500px] rounded-[12px] bg-[#160E24] px-[40px] py-7">
									<h3 className="text-[28px] font-[500] text-white">Log in to continue</h3>
									<p className="mb-3 mt-3 text-[#FFFFFF80]">Please login or create an account to continue.</p>
									<p className="mb-5 text-[#FFFFFF80]">
										By clicking "Continue to Login", I agree to the{" "}
										<Link href={"/terms-of-service"} className="text-[#8BAAF6]">
											Terms of Service
										</Link>{" "}
										and the{" "}
										<Link href={"/privacy-policy"} className="text-[#8BAAF6]">
											Privacy Policy
										</Link>
										.
									</p>
									<Link href="/sign-in">
										<button className="mt-7 flex w-full items-center justify-center rounded-lg font-semibold bg-white px-[16px] py-4 text-black-700 hover:bg-white/90">CONTINUE TO LOGIN</button>
									</Link>
								</div>
							</div>
						</motion.div>
					</AnimatePresence>
				)}

				<div className="h-[430px] rounded-xl lg:h-[250px]">
					<div className="rounded-xl">
						{/* <div className="rounded-[12px]"> */}
						{/* <div className="relative h-full w-full overflow-hidden rounded-[12px]">
						<Image
							src={selectedModel?.image || girlSingingModel}
							alt="male pop artist"
							height={100}
							width={100}
							className="brightness-85 absolute bottom-0 left-0 right-0 top-0 z-0 h-full w-full rounded-[12px] blur-[50px] saturate-[1.3]"
						/>
						</div> */}
						{/* </div> */}
						<div className="flex flex-col items-center justify-center w-full">
							<div className="relative flex items-center justify-center w-full mb-[13px] overflow-visible rounded-lg group">
								<AnimatePresence mode="wait">
									<motion.div
										key={randomGradient}
										initial="hidden"
										animate="visible"
										exit="hidden"
										variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
										transition={{ duration: 0.5 }}
										className="absolute inset-0 rounded-xl bg-[#000000] overflow-hidden"
										style={{
											background: randomGradient.split(";")[0].replace("background: ", ""),
											backgroundBlendMode: randomGradient.split(";")[1].replace(" background-blend-mode: ", ""),
										}}
									></motion.div>
								</AnimatePresence>
								<div className="container z-10 flex flex-col w-full px-6 py-6 mb-4 md:px-6 md:py-10 lg:h-full lg:flex-row">
									{/* <GradientCanvas className="w-full h-full overflow-hidden rounded-lg !absolute left-0 right-0 top-0 bottom-0 z-[-1]">
										<Gradient control='props'
											type='waterPlane'
											animate='on'
											uTime={0.05}
											uSpeed={0.02}
											uStrength={2.4}
											uDensity={1.1}
											uFrequency={5.5}
											uAmplitude={0}
											positionX={-0.7}
											positionY={0.1}
											positionZ={0}
											rotationX={0}
											rotationY={0}
											rotationZ={235}
											color1='#5606FF'
											color2='#FE8989'
											color3='#000000'
											reflection={0.1}
											wireframe={false}
											shader='defaults'
											cAzimuthAngle={190}
											cPolarAngle={105}
											cDistance={1.5}
											cameraZoom={1}
											lightType='env'
											brightness={0.7}
											envPreset='city'
											grain='off'
										/>
										</GradientCanvas> */}
									<div className="mb-[10px] flex flex-none flex-col justify-center lg:mb-0 lg:mr-[30px] lg:flex-1">
										<h1 className="mb-[5px] text-[32px] font-[700] [text-shadow:_0_1px_2px_rgb(0_0_0_/_15%)] text-white">Generate AI Voices</h1>
										<p className="pb-7 pt-2 text-[16px] text-[#ffffff]">
											Explore the Revocalize library of royalty-free AI voice models.
											<br />
											Select a model to get started or <b><a className="underline" href="/create-ai-voice">create yours here</a>.</b>
										</p>
										<div className="relative">
											<button ref={buttonRef} className="step1 relative flex lg:w-[500px] h-[56px] w-full flex-row items-center justify-between rounded-lg bg-[#FFFFFF0D] transition-colors duration-200 hover:bg-[#FFFFFF1A] border-[1px] border-[#FFFFFF33]">
												<input
													className="w-full h-full px-[20px] bg-transparent outline-none cursor-pointer [text-shadow:_0_1px_2px_rgb(0_0_0_/_15%)] text-white"
													value={searchTerm}
													onFocus={() => {
														setUiStates((prev) => ({ ...prev, isShowingList: true }));
														setSearchTerm("");
													}}
													onChange={(e) => {
														setSearchTerm(e.target.value);
													}}
													disabled={loading}
												/>
												<div className="pr-[15px] absolute right-0"
													onClick={() => {
														setUiStates((prev) => ({ ...prev, isShowingList: !prev.isShowingList }));
														setSearchTerm("");
													}}
												>
													<ChevronDownIcon size={20} />
												</div>
											</button>

											{uiStates.isShowingList && (
												<AnimatePresence mode="wait">
													<motion.div
														ref={listRef}
														initial="hidden"
														animate="visible"
														exit="exit"
														variants={{
															hidden: { opacity: 0, y: -20, scale: 0.9 },
															visible: { opacity: 1, y: 0, scale: 1 },
															exit: { opacity: 0, y: -20, scale: 0.9 },
														}}
														transition={{ duration: 0.2 }}
														className="absolute top-[66px] z-10 w-[100%] max-h-[400px] overflow-hidden rounded-lg bg-[#FFFFFF0D] backdrop-blur-[20px]"
													>
														<div className="convertScroll relative w-full max-h-[400px] overflow-y-scroll no-scrollbar">
															<div className="absolute w-full h-full" />
															{modelsData.isLoading && modelsData.isValidating && (
																<div className="flex items-center justify-center w-full h-full">
																	<Spinner />
																</div>
															)}
															{audioConversions.length > 0 &&
																<p className="relative flex w-full flex-row items-center justify-between px-[16px] py-[12px] transition-colors duration-200 hover:bg-[#FFFFFF0D]">
																	Most Recent ({recentModels.length})
																</p>
															}
															{recentModels.length > 0 &&
																recentModels.map((model: any, index: number) => (
																	<button className={index == recentModels.length - 1 ? "relative flex w-full flex-row items-center justify-between px-[16px] py-[12px] transition-colors duration-200 hover:bg-[#FFFFFF0D]" :
																		"border-b relative flex w-full flex-row items-center justify-between  border-[#FFFFFF0D] px-[16px] py-[12px] transition-colors duration-200 hover:bg-[#FFFFFF0D]"} key={index} onClick={() => handleModelSelection(model)}>
																		<div className="flex flex-row items-center">
																			<Image src={model.image_url || defaultModelImage} width={40} height={40} alt={`${model.name} Free AI Voice Generator`} className="h-[40px] w-[40px] rounded-full" />
																			<BsPlayFill className="ml-2 text-[20px] text-white" />
																			<p className="ml-1.5 text-left text-[15px] text-white">{model.name.length > 25 ? `${model.name.substring(0, 25)}...` : model.name}</p>
																		</div>
																		<div className="flex max-w-[180px] flex-wrap items-center justify-end">
																			{model.traits && model.traits.map((trait: any, index: number) => (
																				trait.trait_values.map((value: any, index: number) => (
																					<p key={index} className="mb-[4px] mr-[4px] rounded-full bg-[#FFFFFF0D] px-[8px] py-[2px] text-[13px] [text-shadow:_0_1px_2px_rgb(0_0_0_/_15%)] capitalize">
																						{value}
																					</p>
																				))
																			))}
																		</div>
																	</button>
																))

															}

															<p className="relative flex w-full flex-row items-center justify-between px-[16px] py-[12px] transition-colors duration-200 hover:bg-[#FFFFFF0D]">
																All voices ({searchResults.length}) / Sorted alphabetically
															</p>

															{searchResults &&
																searchResults.map((model: any, index: number) => (
																	<button className="border-b relative flex w-full flex-row items-center justify-between  border-[#FFFFFF0D] px-[16px] py-[12px] transition-colors duration-200 hover:bg-[#FFFFFF0D]" key={index} onClick={() => handleModelSelection(model)}>
																		<div className="flex flex-row items-center">
																			<Image src={model.image_url || defaultModelImage} width={40} height={40} alt={`${model.name} Free AI Voice Generator`} className="h-[40px] w-[40px] rounded-full" />
																			<BsPlayFill className="ml-2 text-[20px] text-white" />
																			<p className="ml-1.5 text-left text-[15px] text-white">{model.name.length > 25 ? `${model.name.substring(0, 25)}...` : model.name}</p>
																		</div>
																		<div className="flex max-w-[180px] flex-wrap items-center justify-end">
																			{" "}
																			{model.traits && model.traits.map((trait: any, index: number) => (
																				trait.trait_values.map((value: any, index: number) => (
																					<p key={index} className="mb-[4px] mr-[4px] rounded-full bg-[#FFFFFF0D] px-[8px] py-[2px] text-[13px] [text-shadow:_0_1px_2px_rgb(0_0_0_/_15%)] capitalize">
																						{value}
																					</p>
																				))
																			))}
																		</div>
																	</button>
																))}
														</div>
													</motion.div>
												</AnimatePresence>
											)}
										</div>
									</div>

									<AnimatePresence mode="wait">
										{selectedModel && (
											<motion.div
												key={selectedModel.id}
												initial="hidden"
												animate="visible"
												exit="exit"
												variants={{
													hidden: { opacity: 0, scale: 0.9 },
													visible: { opacity: 1, scale: 1 },
													exit: { opacity: 0, scale: 0.9 },
												}}
												transition={{ duration: 0.5 }}
												className="flex relative w-full flex-none flex-col rounded-lg border-[1px] border-[#FFFFFF33] lg:w-[537px] px-4 pt-5 pb-3 lg:flex-1 lg:px-4 lg:py-4 bg-[#FFFFFF0D]"
											>
												<div className="absolute px-2.5 py-1 rounded-tr-lg rounded-bl-lg top-[-1px] bg-white text-black-700 uppercase right-[-1px] text-[11px]">
													Model Preview
												</div>
												<div className="items-center block overflow-hidden md:flex md:flex-row md:w-full">


													<Image className="h-full w-auto max-h-[100px] lg:max-h-[160px]  rounded-sm mr-4  lg:block" src={selectedModel?.image_url || defaultModelImage} width={60} height={60} alt={`${selectedModel?.name} AI Voice Generator`} style={{ marginBottom: "auto" }} />


													<div className="w-full">
														<h3 className="mt-3 lg:mt-0 text-white text-xl font-[600] text-shadow-[1px 1px 13px #0000002e]">{selectedModel?.name}</h3>
														<div className="flex-row hidden md:flex my-[10px] ">
															{selectedModel.traits && selectedModel.traits.map((trait: any) => (
																trait.trait_values.map((value: any, index: number) => (
																	<div key={index} className="py-[3px] xl:px-[8px] px-[4px] text-[12px] border-[#FFFFFF33] border-[1px] first:ml-0 ml-[5px] rounded-sm bg-[#FFFFFF0D] shadow-sm capitalize">{value}</div>
																))
															))}
														</div>
														<React.Suspense fallback={<div>Loading...</div>}>
															<WaveformAudioPlayer
																imageUrl={selectedModel?.image_url || defaultModelImage}
																src={selectedModel?.audio_demo_url || getModelAudioUrl(selectedModel?.id)}
																variant="quinary"
																artistName={selectedModel?.name}
																modelType={selectedModel?.model_type || "Royality-free"}
																genre={selectedModel?.genre || "Singing, Chest voice, Tenor, Pop, Jazz"}
																style={{ width: "100%" }}
															/>
														</React.Suspense>
													</div>
												</div>
											</motion.div>
										)}
									</AnimatePresence>
								</div>
							</div>
							<div className="flex flex-col justify-center w-full md:px-[6.5px] mb-10 lg:flex-row 2xl:container 2xl:px-[30px]">
								<div className="step2 w-full rounded-xl px-6 py-6 md:py-7 md:px-7 bg-[#160e26] xl:max-w-[50%] min-w-[50%] xl:mb-0 mb-3 lg:mb-5 self-start">
									<div className="flex flex-row items-center mb-[10px] lg:mb-[15px]">
										<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
											<path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
										</svg>

										<h2 className="text-[20px] font-[700] text-white">What voice do you want to convert?</h2>
									</div>
									<div className="mb-[16px] lg:mt-[8px] flex flex-row">
										<button className={`flex flex-1 justify-center p-[12px] lg:p-[16px] text-[14px] lg:text-[16px] font-[600] tracking-wide hover:text-white transition-colors duration-200 ${selectedTab === "Voice" ? "text-white border-b-2 border-white" : "border-b-[1px] border-[#ffffff14]"}`} onClick={() => setSelectedTab("Voice")}>
											AUDIO FILE
										</button>
										<button className={`flex flex-1 justify-center p-[12px] lg:p-[16px] text-[14px] lg:text-[16px] font-[600] tracking-wide hover:text-white transition-colors duration-200 ${selectedTab === "YouTube" ? "text-white border-b-2 border-white" : "border-b-[1px] border-[#ffffff14]"}`} onClick={() => setSelectedTab("YouTube")}>
											<FaYoutube className="mr-1.5 text-[19px] my-auto" />
											YOUTUBE
											<span className="hidden lg:block inline-block ml-2.5 my-auto px-1.5 py-0.5 text-[11px] font-medium rounded-full text-white" style={{ backgroundImage: "linear-gradient(91.62deg, rgb(51, 71, 250) -10.42%, rgb(212, 120, 227) 100%)" }}>
												BETA
											</span>
										</button>
									</div>
									{/* Upload & Record Tab */}
									{selectedTab === "Voice" && (
										<>
											<div className="mt-[20px] mb-[10px] flex flex-row">
												<div {...getRootProps()} className="flex h-[120px] lg:h-[150px] w-full cursor-pointer flex-col items-center justify-center rounded-[8px] bg-transparent p-[10px] border-[1px] border-dashed border-gray-500 hover:bg-[#FFFFFF26] lg:w-[283px] ">
													<input type="file" accept=".mp3, .ogg, .wav, .flac" ref={inputRef} {...getInputProps()} className="hidden" disabled={loading} />
													<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-8 h-8">
														<path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
													</svg>
													<p className="mt-[5px] text-center text-[15px] font-[500] text-white lg:text-[18px]">
														Upload audio <br />
														(click or drop)
													</p>
												</div>
												<div className="hidden">
													{/* <ReactMic record={isRecording} onStop={onStoppedRecording} visualSetting="none" mimeType="audio/webm" /> */}
													<AudioRecorder
														onRecordingComplete={onStoppedRecording}
														recorderControls={recorderControls}
														downloadFileExtension="mp3"
														
														/>
												</div>
												<button aria-disabled={loading} onClick={isRecording ? handleStopRecording : handleStartRecording} className={`ml-[8px] flex h-[120px] lg:h-[150px]  w-full cursor-pointer flex-col items-center justify-center rounded-[8px] ${isRecording ? "bg-white" : "bg-[#FFFFFF0D]"}  hover:${isRecording ? "bg-white" : "bg-[#FFFFFF26] transform "} hover:scale-95 transition-all duration-300 lg:w-[283px]`} disabled={loading}>
													{isRecording ? (
														<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#f04f4f" className="w-6 h-6 mb-2">
															<g fill="#f04f4f"><path strokeLinecap="round" strokeLinejoin="round" d="M5.25 7.5A2.25 2.25 0 017.5 5.25h9a2.25 2.25 0 012.25 2.25v9a2.25 2.25 0 01-2.25 2.25h-9a2.25 2.25 0 01-2.25-2.25v-9z" /></g>
														</svg>

													) : (

														<svg fill="none" height="24" viewBox="0 0 25 24" width="25" xmlns="http://www.w3.org/2000/svg" className="mb-2 scale-125 ui-c-lnvXGP ui-c-lnvXGP-ivTskn-variant-red">
															<g fill="#f04f4f">
																<circle cx="12.5" cy="12.2748" r="5" />
																	<path clipRule="evenodd" d="m12.5 5.27478c-3.86599 0-7 3.13401-7 7.00002 0 3.866 3.13401 7 7 7 3.866 0 7-3.134 7-7 0-3.86601-3.134-7.00002-7-7.00002zm-9 7.00002c0-4.97058 4.02944-9.00002 9-9.00002 4.9706 0 9 4.02944 9 9.00002 0 4.9705-4.0294 9-9 9-4.97056 0-9-4.0295-9-9z" fillRule="evenodd" />
															</g>
														</svg>
													)}
													<p className={`mt-[5px] text-[15px] lg:text-[18px] font-[500] ${isRecording ? "text-black-700" : "text-white"}`}>{isRecording ? "Stop recording" : "Click to record"}</p>
												</button>
											</div>

											{selectedFile && (
												<React.Suspense fallback={<div>Loading...</div>}>
													<WaveformAudioPlayer variant="quaternary" src={selectedFile} reset={() => setSelectedFile(null)} />
												</React.Suspense>
											)}
											{audioUrl && (
												<React.Suspense fallback={<div>Loading...</div>}>
													<WaveformAudioPlayer variant="quaternary" src={audioUrl} reset={() => setAudioUrl(null)} />
												</React.Suspense>
											)}

											{/* Upload progress */}
											<AnimatePresence>
												{uploading && (
													<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
														<p className="mt-2 text-[15px] font-[500] animate-pulse">Upload progress: {uploadProgress}%</p>
														<div className="relative pt-1">
															<div className="mb-4 flex h-1 overflow-hidden rounded bg-[#FFFFFF0D] text-xs">
																<div className="flex flex-col justify-center whitespace-nowrap bg-[#8BAAF6] text-center text-white shadow-none transition-all duration-500" style={{ width: `${uploadProgress}%` }}></div>
															</div>
														</div>
													</motion.div>
												)}
												{uploadSuccess && (selectedFile || audioUrl) && (
													<motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mt-3 mb-3 text-[15px] font-[500] text-white">
														Your audio ({audioDuration}s) is ready to be Revocalized.
													</motion.p>
												)}
												{uploadError && (selectedFile || audioUrl) && (
													<motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mt-3 mb-3 text-[15px] font-[500] text-[#F04F4F]">
														Upload failed. Please try again.
													</motion.p>
												)}
												<div>
													{uploadSuccess && (selectedFile || audioUrl) && (
														<button
															className="flex flex-row items-center w-full sm:w-auto justify-center mb-3 mr-0 lg:mb-0 lg:mr-3 rounded-lg border-[1px] border-[#FFFFFF1A] bg-transparent px-[16px] py-2.5 text-[15px] font-[500] hover:border-[#FFFFFF80] disabled:border-[#FFFFFF26] disabled:text-[#FFFFFF4D]"
															onClick={() => {
																resetAll();
															}}
															disabled={!selectedFile && !audioUrl}
														>
															<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-2">
																<path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
															</svg>
															Discard
														</button>
													)}
												</div>
											</AnimatePresence>

											<div>
												<div className="flex flex-row items-center mt-5 mb-3">
													<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
														<path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
													</svg>

													<p className="text-[#FFFFFF80] text-[13px] uppercase font-semibold">Quick tips</p>
												</div>
												<ul className="list-disc pl-[15px]">
													<li className="text-[#FFFFFF80] text-[14px] mb-1">File upload: supports .wav, .mp3, .flac - up to 5 minutes duration.</li>
													<li className="text-[#FFFFFF80] text-[14px] mb-1">Click to record: Make sure you allow your microphone to record in the browser (a notification will appear).</li>
													<li className="text-[#FFFFFF80] text-[14px] mb-1">
														Make sure your audio is clear and free from background noise or instrumentals.
													</li>
												</ul>
											</div>
										</>
									)}

									{/* YouTube Tab */}
									{selectedTab === "YouTube" && (
										<div className="mb-5">
											<p className="text-[#FFFFFF80] text-[14px] mb-1">Enter a link to a YouTube video and Revocalize will isolate the main vocal and convert it to your selected AI model. <span className="text-white">Max video length: 6 min</span></p>
											<input type="text" placeholder="Enter YouTube link..." value={youtubeLink} className="w-full rounded-[8px] bg-[#FFFFFF0D] px-5 py-4 text-white my-3" onChange={handleYoutubeLinkChange} />
											{youtubeLink && isYouTubeLinkValid(youtubeLink) && (
												<div className="relative h-[330px] w-full rounded-[8px] overflow-hidden">
													<iframe className="absolute top-0 left-0 w-full h-full" src={`https://www.youtube.com/embed/${new URL(youtubeLink).searchParams.get("v")}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
												</div>
											)}
										</div>
									)}

									<div className="rounded-lg bg-[#FFFFFF06]  transition-colors duration-200 hover:text-white">
										<button
											className="flex flex-row items-center justify-between w-full p-5 mt-5 group"
											onClick={() =>
												setUiStates((prev) => ({
													...prev,
													isShowingAdvancedSettings: !prev.isShowingAdvancedSettings,
												}))
											}
										>
											<h3 className="text-[13px] font-[700]">ADVANCED SETTINGS</h3>
											{uiStates.isShowingAdvancedSettings ? (
												<svg fill="none" height="16" viewBox="0 0 24 24" width="16" xmlns="http://www.w3.org/2000/svg" className="transition-transform duration-500 ease-in-out transform scale-125 group-hover:rotate-180">
													<path d="M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
												</svg>
											) : (
												<svg fill="none" height="16" viewBox="0 0 24 24" width="16" xmlns="http://www.w3.org/2000/svg" className="transition-transform duration-500 ease-in-out transform scale-125 group-hover:rotate-180">
													<path d="M12 5V19M5 12H19" stroke="currentColor" fillRule="evenodd" clipRule="evenodd" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
												</svg>
											)}
										</button>
										<AnimatePresence initial={false}>
											{uiStates.isShowingAdvancedSettings && (
												<motion.div
													key={`conversion-settings-wrapper`}
													className="px-5 pb-7"
													initial="closed"
													animate={uiStates.isShowingAdvancedSettings ? "open" : "closed"}
													variants={{
														open: { opacity: 1, height: "auto" },
														closed: { opacity: 0, height: 0 },
													}}
													transition={{ duration: 0.25 }}
												>
													<div className="mt-[20px] flex w-full flex-row justify-between">
														<div className="flex flex-col">
															<p className="text-[15px] font-[500] text-white">Pitch Shift (Semitones)</p>
															<p className="mt-[5px] text-[14px] text-[#FFFFFF80]">Adjust the pitch of your input audio.</p>
														</div>
														<div className="flex w-[126px] flex-row items-center justify-between rounded-lg bg-[#FFFFFF0D] px-2 py-1">
															<button disabled={loading} onClick={() => setTranspose((prev: number) => prev - 1)} className="flex h-[24px] w-[24px] items-center justify-center rounded-[2px] bg-[#FFFFFF0D] text-2xl hover:bg-[#FFFFFF1A] transition-colors duration-200">
																-
															</button>
															<p className="font-[400] font-system">{transpose > 0 ? `+${transpose}` : transpose}</p>
															<button onClick={() => setTranspose((prev: number) => prev + 1)} className="flex h-[24px] w-[24px] items-center justify-center rounded-[2px] bg-[#FFFFFF0D] text-2xl hover:bg-[#FFFFFF1A] transition-colors duration-200" disabled={loading}>
																+
															</button>
														</div>
													</div>
													{/* <div className="mt-[35px]">
													<p className="text-[15px] font-[500] text-white">
													Conversion Strength (Feature Ratio)
													</p>
													<p className="mt-[5px] text-[14px] text-[#FFFFFF80]">
													Increase to add more accent and articulation from
													the AI model. High values may lead to
													overcorrecting and artifacts.
													</p>
													<div className="mt-[20px] flex flex-row items-center">
													<Slider
														min={0}
														max={100}
														onValueChange={(e: any) =>
														setConversionStrength(e)
														}
													/>
													<p className="ml-[10px] flex h-[28px] w-[65px] items-center justify-center rounded-lg bg-[#FFFFFF0D]">
														{conversionStrength}%
													</p>
													</div>
												</div> */}
													{/* <div className="mt-[35px]">
													<p className="text-[15px] font-[500] text-white">
													Model Volume
													</p>
													<p className="mt-[5px] text-[14px] text-[#FFFFFF80]">
													Increase to convert the volume of your input audio
													to the volume of the AI model. Decrease to hear
													dynamics from the input audio. High values may
													accentuate noise.
													</p>
													<div className="mt-[20px] flex flex-row items-center">
													<Slider
														min={0}
														max={100}
														onValueChange={(e: any) => setModelVolume(e)}
													/>
													<p className="ml-[10px] flex h-[28px] w-[65px] items-center justify-center rounded-lg bg-[#FFFFFF0D]">
														{modelVolume}%
													</p>
													</div>
												</div> */}

													<div className="mt-[35px]">
														<p className="text-[15px] font-[500] text-white">Pre-Processing Effects</p>
														<p className="mt-[5px] text-[14px] text-[#FFFFFF80]">Apply subtle effects to clean up your input audio before conversion.</p>
														<div className="mt-[10px] flex flex-row overflow-x-scroll">
															{[
																{
																	name: "Noise Gate",
																	state: noiseGate,
																	setState: setNoiseGate,
																	icon: <MdNoiseAware className={`my-1 text-[20px] text-${noiseGate ? "black-700" : "#bebebe"}`} />,
																},
																{
																	name: "High Pass",
																	state: highPass,
																	setState: setHighPass,
																	icon: (
																		<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={`my-1`} fill={`${highPass ? "black" : "#bebebe"}`}>
																			<path
																				fillRule="evenodd"
																				clipRule="evenodd"
																				d="M6.07278 10.1541C7.32371 8.9177 9.15894 8.25 11.5 8.25H19C19.4142 8.25 19.75 8.58579 19.75 9C19.75 9.41421 19.4142 9.75 19 9.75H11.5C9.44106 9.75 8.02629 10.3323 7.12722 11.2209C6.22766 12.11 5.75 13.3989 5.75 15C5.75 15.4142 5.41421 15.75 5 15.75C4.58579 15.75 4.25 15.4142 4.25 15C4.25 13.1011 4.82234 11.39 6.07278 10.1541Z"
																			></path>
																		</svg>
																	),
																},
																{
																	name: "Low Pass",
																	state: lowPass,
																	setState: setLowPass,
																	icon: (
																		<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={`my-1`} fill={`${lowPass ? "black" : "#bebebe"}`}>
																			<path
																				fillRule="evenodd"
																				clipRule="evenodd"
																				d="M17.9272 10.1541C16.6763 8.9177 14.8411 8.25 12.5 8.25H5C4.58579 8.25 4.25 8.58579 4.25 9C4.25 9.41421 4.58579 9.75 5 9.75H12.5C14.5589 9.75 15.9737 10.3323 16.8728 11.2209C17.7723 12.11 18.25 13.3989 18.25 15C18.25 15.4142 18.5858 15.75 19 15.75C19.4142 15.75 19.75 15.4142 19.75 15C19.75 13.1011 19.1777 11.39 17.9272 10.1541Z"
																			></path>
																		</svg>
																	),
																},
																{
																	name: "Compressor",
																	state: preprocessCompressor,
																	setState: setPreprocessCompressor,
																	icon: (
																		<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={`my-1`} fill={`${preprocessCompressor ? "black" : "#bebebe"}`}>
																			<path fillRule="evenodd" clipRule="evenodd" d="M2.25 3C2.25 2.58579 2.58579 2.25 3 2.25H21C21.4142 2.25 21.75 2.58579 21.75 3C21.75 3.41421 21.4142 3.75 21 3.75H3C2.58579 3.75 2.25 3.41421 2.25 3Z" fill-opacity="0.7"></path>
																			<path fillRule="evenodd" clipRule="evenodd" d="M2.25 21C2.25 20.5858 2.58579 20.25 3 20.25H21C21.4142 20.25 21.75 20.5858 21.75 21C21.75 21.4142 21.4142 21.75 21 21.75H3C2.58579 21.75 2.25 21.4142 2.25 21Z" fill-opacity="0.7"></path>
																			<path fillRule="evenodd" clipRule="evenodd" d="M12 5.25C12.4142 5.25 12.75 5.58579 12.75 6V18C12.75 18.4142 12.4142 18.75 12 18.75C11.5858 18.75 11.25 18.4142 11.25 18V6C11.25 5.58579 11.5858 5.25 12 5.25Z"></path>
																			<path fillRule="evenodd" clipRule="evenodd" d="M6 8.25C6.41421 8.25 6.75 8.58579 6.75 9V15C6.75 15.4142 6.41421 15.75 6 15.75C5.58579 15.75 5.25 15.4142 5.25 15V9C5.25 8.58579 5.58579 8.25 6 8.25Z"></path>
																			<path fillRule="evenodd" clipRule="evenodd" d="M15 7.25C15.4142 7.25 15.75 7.58579 15.75 8V16C15.75 16.4142 15.4142 16.75 15 16.75C14.5858 16.75 14.25 16.4142 14.25 16V8C14.25 7.58579 14.5858 7.25 15 7.25Z"></path>
																			<path fillRule="evenodd" clipRule="evenodd" d="M9 10.25C9.41421 10.25 9.75 10.5858 9.75 11V13C9.75 13.4142 9.41421 13.75 9 13.75C8.58579 13.75 8.25 13.4142 8.25 13V11C8.25 10.5858 8.58579 10.25 9 10.25Z"></path>
																			<path fillRule="evenodd" clipRule="evenodd" d="M18 9.25C18.4142 9.25 18.75 9.58579 18.75 10V14C18.75 14.4142 18.4142 14.75 18 14.75C17.5858 14.75 17.25 14.4142 17.25 14V10C17.25 9.58579 17.5858 9.25 18 9.25Z"></path>
																		</svg>
																	),
																},
															].map(({ name, state, icon, setState }, index) => (
																<button className={`flex min-w-[100px] w-[166px] flex-col items-center justify-center rounded-lg transition-all duration-300 hover:scale-95 ${state ? "bg-white hover:bg-[#FFFFFFCC]" : "bg-[#FFFFFF0D] hover:bg-[#FFFFFF1A]"} px-[2px] py-[8px]`} onClick={() => setState((prev) => !prev)} style={{ marginLeft: index === 0 ? 0 : "10px" }} disabled={loading}>
																	{icon}
																	<p className={`text-[13px] font-[500] text-${state ? "black-700" : "[##bebebe]"}`}>{name}</p>
																</button>
															))}
														</div>
														<div className="mt-[25px]">
															<p className="text-[15px] font-[500] text-white">Post-Processing Effects</p>
															<p className="mt-[5px] text-[14px] text-[#FFFFFF80]">Adjust the output audio for instant release-ready sound.</p>
															<div className="mt-[10px] flex flex-row overflow-x-scroll">
																{[
																	{
																		name: "Compressor",
																		state: compressor,
																		setState: setCompressor,
																		icon: (
																			<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={`my-1`} fill={`${compressor ? "black" : "#bebebe"}`}>
																				<path fillRule="evenodd" clipRule="evenodd" d="M2.25 3C2.25 2.58579 2.58579 2.25 3 2.25H21C21.4142 2.25 21.75 2.58579 21.75 3C21.75 3.41421 21.4142 3.75 21 3.75H3C2.58579 3.75 2.25 3.41421 2.25 3Z" fill-opacity="0.7"></path>
																				<path fillRule="evenodd" clipRule="evenodd" d="M2.25 21C2.25 20.5858 2.58579 20.25 3 20.25H21C21.4142 20.25 21.75 20.5858 21.75 21C21.75 21.4142 21.4142 21.75 21 21.75H3C2.58579 21.75 2.25 21.4142 2.25 21Z" fill-opacity="0.7"></path>
																				<path fillRule="evenodd" clipRule="evenodd" d="M12 5.25C12.4142 5.25 12.75 5.58579 12.75 6V18C12.75 18.4142 12.4142 18.75 12 18.75C11.5858 18.75 11.25 18.4142 11.25 18V6C11.25 5.58579 11.5858 5.25 12 5.25Z"></path>
																				<path fillRule="evenodd" clipRule="evenodd" d="M6 8.25C6.41421 8.25 6.75 8.58579 6.75 9V15C6.75 15.4142 6.41421 15.75 6 15.75C5.58579 15.75 5.25 15.4142 5.25 15V9C5.25 8.58579 5.58579 8.25 6 8.25Z"></path>
																				<path fillRule="evenodd" clipRule="evenodd" d="M15 7.25C15.4142 7.25 15.75 7.58579 15.75 8V16C15.75 16.4142 15.4142 16.75 15 16.75C14.5858 16.75 14.25 16.4142 14.25 16V8C14.25 7.58579 14.5858 7.25 15 7.25Z"></path>
																				<path fillRule="evenodd" clipRule="evenodd" d="M9 10.25C9.41421 10.25 9.75 10.5858 9.75 11V13C9.75 13.4142 9.41421 13.75 9 13.75C8.58579 13.75 8.25 13.4142 8.25 13V11C8.25 10.5858 8.58579 10.25 9 10.25Z"></path>
																				<path fillRule="evenodd" clipRule="evenodd" d="M18 9.25C18.4142 9.25 18.75 9.58579 18.75 10V14C18.75 14.4142 18.4142 14.75 18 14.75C17.5858 14.75 17.25 14.4142 17.25 14V10C17.25 9.58579 17.5858 9.25 18 9.25Z"></path>
																			</svg>
																		),
																	},
																	{
																		name: "Chorus",
																		state: chorus,
																		setState: setChorus,
																		icon: (
																			<svg width="24" height="24" viewBox="0 0 24 24" className={`my-1`} fill={`${chorus ? "black" : "#bebebe"}`} xmlns="http://www.w3.org/2000/svg">
																				<path
																					fillRule="evenodd"
																					clipRule="evenodd"
																					d="M17.2216 9.30382C17.5979 10.055 17.9449 10.9017 18.3059 11.784C18.4627 12.1673 18.9006 12.351 19.284 12.1942C19.6674 12.0373 19.851 11.5994 19.6942 11.216L19.6849 11.1933C19.2672 10.1722 18.8298 9.1031 18.3252 8.17688C18.3047 8.13932 18.2841 8.1018 18.2632 8.06436C18.085 8.1527 17.8382 8.3604 17.5075 8.84543C17.4102 8.98817 17.3152 9.14107 17.2216 9.30382ZM15.2652 5.33642C15.0242 5.2802 14.7695 5.25 14.5001 5.25C13.0123 5.25 11.971 6.1779 11.2085 7.29625C10.4606 8.39316 9.87347 9.82851 9.32555 11.1679L9.32555 11.1679L9.30588 11.216C8.94214 12.1052 8.59407 12.9523 8.22163 13.6964C8.31524 13.859 8.41022 14.0119 8.50751 14.1546C8.8381 14.6394 9.08485 14.8472 9.26297 14.9356C9.79582 13.9802 10.2471 12.8769 10.6745 11.8321L10.6745 11.832L10.6942 11.784C11.2657 10.3871 11.7985 9.0937 12.4479 8.14125C12.9651 7.38258 13.484 6.94485 14.0634 6.80214C14.1092 6.73111 14.1556 6.66105 14.2026 6.59207C14.4953 6.16282 14.8467 5.72605 15.2652 5.33642ZM6.26482 17.6632C5.84648 17.2737 5.49519 16.8371 5.2026 16.4079C5.15557 16.339 5.10918 16.2689 5.06339 16.1979C4.48401 16.0552 3.96511 15.6174 3.44783 14.8587C2.79843 13.9063 2.26565 12.6129 1.69417 11.216C1.53734 10.8326 1.09941 10.649 0.716036 10.8058C0.332663 10.9627 0.149019 11.4006 0.305856 11.784L0.325521 11.832C0.873436 13.1715 1.46059 14.6068 2.20849 15.7038C2.971 16.8221 4.01225 17.75 5.50003 17.75C5.76925 17.75 6.02385 17.7196 6.26482 17.6632Z"
																					fill-opacity="0.4"
																				></path>
																				<path
																					fillRule="evenodd"
																					clipRule="evenodd"
																					d="M12.808 15.7033C12.0468 16.8215 11.0068 17.75 9.52013 17.75C8.0335 17.75 6.99351 16.8215 6.23228 15.7033C5.4855 14.6064 4.89924 13.1711 4.35214 11.8317L4.3325 11.7836C4.17587 11.4002 4.35974 10.9623 4.74319 10.8057C5.12665 10.6491 5.56448 10.8329 5.72112 11.2164C6.29174 12.6133 6.82375 13.9067 7.4722 14.8592C8.11513 15.8035 8.76013 16.25 9.52013 16.25C10.2801 16.25 10.9251 15.8035 11.5681 14.8592C12.2165 13.9067 12.7485 12.6133 13.3192 11.2164L13.3388 11.1683C13.8859 9.82887 14.4722 8.39356 15.2189 7.29667C15.9802 6.17854 17.0202 5.25 18.5068 5.25C20.3207 5.25 21.4648 6.62253 22.2742 8.0804C22.801 9.02921 23.2532 10.1364 23.6843 11.1918L23.6944 11.2164C23.851 11.5998 23.6671 12.0377 23.2837 12.1943C22.9002 12.3509 22.4624 12.1671 22.3057 11.7836C21.8633 10.7004 21.4419 9.67155 20.9628 8.80849C20.1935 7.42288 19.433 6.75 18.5068 6.75C17.7468 6.75 17.1018 7.19646 16.4588 8.14083C15.8104 9.0933 15.2784 10.3867 14.7078 11.7836L14.6881 11.8317C14.141 13.1711 13.5548 14.6064 12.808 15.7033Z"
																				></path>
																			</svg>
																		),
																	},
																	{
																		name: "Reverb",
																		state: reverb,
																		setState: setReverb,
																		icon: (
																			<svg className={`my-1`} fill={`${reverb ? "black" : "#bebebe"}`} width="25" height="24" viewBox="0 0 25 24" xmlns="http://www.w3.org/2000/svg">
																				<path d="M16.125 12C16.125 14.2091 14.3341 16 12.125 16C9.91586 16 8.125 14.2091 8.125 12C8.125 9.79086 9.91586 8 12.125 8C14.3341 8 16.125 9.79086 16.125 12Z"></path>
																				<path
																					fillRule="evenodd"
																					clipRule="evenodd"
																					d="M12.125 17.5C15.1626 17.5 17.625 15.0376 17.625 12C17.625 8.96243 15.1626 6.5 12.125 6.5C9.08743 6.5 6.625 8.96243 6.625 12C6.625 15.0376 9.08743 17.5 12.125 17.5ZM12.125 19C15.991 19 19.125 15.866 19.125 12C19.125 8.13401 15.991 5 12.125 5C8.25901 5 5.125 8.13401 5.125 12C5.125 15.866 8.25901 19 12.125 19Z"
																					fill-opacity="0.7"
																				></path>
																				<path
																					fillRule="evenodd"
																					clipRule="evenodd"
																					d="M12.125 20.5C16.8194 20.5 20.625 16.6944 20.625 12C20.625 7.30558 16.8194 3.5 12.125 3.5C7.43058 3.5 3.625 7.30558 3.625 12C3.625 16.6944 7.43058 20.5 12.125 20.5ZM12.125 22C17.6478 22 22.125 17.5228 22.125 12C22.125 6.47715 17.6478 2 12.125 2C6.60215 2 2.125 6.47715 2.125 12C2.125 17.5228 6.60215 22 12.125 22Z"
																					fill-opacity="0.5"
																				></path>
																			</svg>
																		),
																	},
																	{
																		name: "Delay",
																		state: delay,
																		setState: setDelay,
																		icon: (
																			<svg className={`my-1`} fill={`${delay ? "black" : "#bebebe"}`} width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
																				<path d="M8.88573 11.7125L5.97225 3.33624C5.78713 2.80403 5 2.93702 5 3.5005V20.5816C5 21.145 5.78713 21.278 5.97225 20.7458L8.88573 12.3695C8.95974 12.1568 8.95974 11.9253 8.88573 11.7125Z"></path>
																				<path d="M14.8825 11.7082L12.9715 6.29357C12.7844 5.76344 12 5.8978 12 6.45998V17.622C12 18.1842 12.7844 18.3186 12.9715 17.7884L14.8825 12.3738C14.9585 12.1585 14.9585 11.9236 14.8825 11.7082Z" fill-opacity="0.7"></path>
																				<path d="M19.8757 11.6994L18.9699 9.20832C18.7787 8.68252 18 8.81971 18 9.37919V14.703C18 15.2625 18.7787 15.3997 18.9699 14.8739L19.8757 12.3828C19.956 12.1621 19.956 11.9201 19.8757 11.6994Z" fill-opacity="0.4"></path>
																			</svg>
																		),
																	},
																].map(({ name, state, icon, setState }, index) => (
																	<button
																		className={`flex min-w-[100px] w-[166px] flex-col items-center justify-center rounded-lg transition-all duration-300 hover:scale-95 ${state ? "bg-white hover:bg-[#FFFFFFCC]" : "bg-[#FFFFFF0D] hover:bg-[#FFFFFF1A]"} px-[2px] py-[8px]`}
																		onClick={() => setState((prev) => !prev)}
																		style={{
																			marginLeft: index === 0 ? 0 : "10px",
																		}}
																		disabled={loading}
																	>
																		{icon}
																		<p className={`text-[13px] font-[500] text-${state ? "black-700" : "[##bebebe]"}`}>{name}</p>
																	</button>
																))}
															</div>
														</div>

														<div className="px-5 py-5 rounded-lg bg-[#FFFFFF0D] mt-[0px]">
															<div className="flex items-center justify-between cursor-pointer" onClick={() => !loading && setAutoDetectKey((prev) => !prev)}>
																<div>
																	<p className="text-[15px] font-[500] text-white">
																		AI Key Detection
																		<div className="ml-3 mt-2 inline-block rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 px-1.5 py-0.5 text-xs font-semibold uppercase text-white">BETA</div>
																	</p>
																	<p className="mt-[5px] text-[14px] text-[#FFFFFF80]">Automatically detect the key of the voice</p>
																</div>
																<div className="flex flex-col items-end justify-between">
																	<Switch id="autokey-switch" onCheckedChange={(checked) => setAutoDetectKey(checked)} checked={autoDetectKey} onClick={(event) => event.stopPropagation()} disabled={loading} />
																	<div className="flex items-center">
																		{autoDetectKey && songKey && (selectedFile || selectedAudioFile) && (
																			<div className="mt-1">
																				<p className="text-[13px] font-[500]">
																					<HiMiniSparkles className="text-fuchsia-600 mr-[5px] inline-block" />
																					{songKey} {songScale}
																				</p>
																			</div>
																		)}
																		{!autoDetectKey && (
																			<div className="mt-1">
																				<p className="text-[13px] font-[500] invisible">
																					<HiMiniSparkles className="text-fuchsia-600 mr-[5px] inline-block" />
																					Placeholder
																				</p>
																			</div>
																		)}
																	</div>
																</div>
															</div>
															{!autoDetectKey && (
																<div className="flex-row items-center justify-between inline-block w-full mt-4 lg:flex rounded-lg bg-[#1c142b] px-5 pb-5 pt-2.5">
																	<DropdownSelector
																		hideHoverCard={true}
																		clear={false}
																		label="Key"
																		options={[
																			{ id: "C", name: "C" },
																			{ id: "C# / Db", name: "C# / Db" },
																			{ id: "D", name: "D" },
																			{ id: "D# / Eb", name: "D# / Eb" },
																			{ id: "E", name: "E" },
																			{ id: "F", name: "F" },
																			{ id: "F# / Gb", name: "F# / Gb" },
																			{ id: "G", name: "G" },
																			{ id: "G# / Ab", name: "G# / Ab" },
																			{ id: "A", name: "A" },
																			{ id: "A# / Bb", name: "A# / Bb" },
																			{ id: "B", name: "B" },
																		]}
																		onValueChange={(value: any) => {
																			!loading && setSongKey(value.id);
																		}}
																		className="w-full px-0 lg:pr-5"
																		selectedValue={[
																			{ id: "C", name: "C" },
																			{ id: "C# / Db", name: "C# / Db" },
																			{ id: "D", name: "D" },
																			{ id: "D# / Eb", name: "D# / Eb" },
																			{ id: "E", name: "E" },
																			{ id: "F", name: "F" },
																			{ id: "F# / Gb", name: "F# / Gb" },
																			{ id: "G", name: "G" },
																			{ id: "G# / Ab", name: "G# / Ab" },
																			{ id: "A", name: "A" },
																			{ id: "A# / Bb", name: "A# / Bb" },
																			{ id: "B", name: "B" },
																		].filter((option) => option.id === songKey)[0]}
																		disabled={loading}
																	/>
																	<DropdownSelector
																		hideHoverCard={true}
																		clear={false}
																		label="Scale"
																		options={[
																			{ id: "major", name: "Major" },
																			{ id: "minor", name: "Minor" },
																		]}
																		onValueChange={(value: any) => {
																			!loading && setSongScale(value.id);
																		}}
																		className="w-full"
																		selectedValue={[
																			{ id: "major", name: "Major" },
																			{ id: "minor", name: "Minor" },
																		].filter((option) => option.id === songScale)[0]}
																		disabled={loading}
																	/>
																</div>
															)}

															<div className="flex items-center justify-between mt-6 cursor-pointer" onClick={() => !loading && setAutoTune((prev) => !prev)} >
																<div>
																	<p className="text-[15px] font-[500] text-white">
																		Auto-Tune
																		<div className="ml-3 mt-2 inline-block rounded-full bg-gradient-to-r from-red-500 to-orange-500 px-1.5 py-0.5 text-xs font-semibold uppercase text-white">NEW</div>
																	</p>
																	<p className="mt-[5px] text-[14px] text-[#FFFFFF80]">Automatically pitch correct the voice</p>
																</div>
																<Switch id="autotune-switch" onCheckedChange={(checked) => setAutoTune(checked)} checked={autoTune} onClick={(event) => event.stopPropagation()} disabled={loading} />
															</div>

															<div className="flex items-center justify-between mt-6 cursor-pointer" onClick={() => !loading && setHarmony((prev) => !prev)}>
																<div>
																	<p className="text-[15px] font-[500] text-white">
																		Harmony
																		<div className="ml-3 mt-2 inline-block rounded-full bg-gradient-to-r from-red-500 to-orange-500 px-1.5 py-0.5 text-xs font-semibold uppercase text-white">New</div>
																	</p>
																	<p className="mt-[5px] text-[14px] text-[#FFFFFF80]">Generate harmonies for the voice</p>
																</div>
																<Switch id="harmony-switch" onCheckedChange={setHarmony} checked={harmony} onClick={(event) => event.stopPropagation()} disabled={loading} />
															</div>
															{harmony && (
																<div className="flex-row items-center justify-between inline-block w-full mt-4 lg:flex rounded-lg bg-[#1c142b] px-5 pb-5 pt-2.5">
																	<DropdownSelector
																		hideHoverCard={true}
																		clear={false}
																		label="Harmony Type"
																		options={[
																			{ id: "second", name: "2nd Harmony" },
																			{ id: "third", name: "3rd Harmony" },
																			{ id: "fourth", name: "4th Harmony" },
																			{ id: "fifth", name: "5th Harmony" },
																			{ id: "sixth", name: "6th Harmony" },
																			{ id: "seventh", name: "7th Harmony" },
																		]}
																		onValueChange={(value: any) => {
																			!loading && setHarmonyType(value.id);
																		}}
																		className="w-full"
																		disabled={loading}
																	/>
																</div>
															)}

															<div className="flex items-center justify-between mt-6 cursor-pointer" onClick={() => !loading && setIsolateVocals((prev) => !prev)} >
																<div>
																	<p className="text-[15px] font-[500] text-white">
																		Separate Vocals
																		<div className="ml-3 mt-2 inline-block rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 px-1.5 py-0.5 text-xs font-semibold uppercase text-white">BETA</div>
																	</p>
																	<p className="mt-[5px] text-[14px] text-[#FFFFFF80]">Extract the vocals from the input audio</p>
																</div>
																<Switch id="isolate-switch" onCheckedChange={(checked) => setIsolateVocals(checked)} checked={isolateVocals} onClick={(event) => event.stopPropagation()} disabled={loading} />
															</div>

														</div>
													</div>
												</motion.div>
											)}
										</AnimatePresence>
									</div>

									{errorMessage && (
										<div className="flex items-center justify-between px-5 py-3 mt-6 text-white bg-red-600 rounded-lg">
											<p className="text-md">{errorMessage}</p>
											<button className="ml-3 bg-transparent border-none" onClick={() => setErrorMessage("")}>
												<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 text-white">
													<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
												</svg>
											</button>
										</div>
									)}

									<div className="inline-block w-full">
										<div>
											<button
												className={`rounded-lg w-full p-8 my-3 px-[16px] py-4 text-[16px] font-[500] transition-all duration-200 
                        						${uploading ? "bg-[#FFFFFF0D] text-[#FFFFFF4D]" : "bg-primary-500 text-white hover:bg-primary-600"} disabled:bg-[#FFFFFF0D] disabled:text-[#FFFFFF4D]`}
												disabled={(selectedTab === "Voice" && !selectedFile && !audioUrl) || (selectedTab === "YouTube" && (!youtubeLink || !isYouTubeLinkValid(youtubeLink))) || (Number(audioDuration) / 60) > (organization?.credits || 0) || uploading || loading}
												onClick={handleStartGeneration}
											>
												{uploading ? (
													"Uploading..."
												) : loading ? (
													<>
														<div className="animate-spin mr-2.5 inline-flex align-middle mb-[2px]">
															<svg fill="none" height="16" stroke="currentColor" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg">
																<path d="M14 8C14 11.3137 11.3137 14 8 14 4.68629 14 2 11.3137 2 8 2 4.68629 4.68629 2 8 2 11.3137 2 14 4.68629 14 8Z" opacity=".15" />
																	<path d="M14 8C14 11.3137 11.3137 14 8 14 4.68629 14 2 11.3137 2 8 2 4.68629 4.68629 2 8 2" strokeLinecap="round" />
															</svg>
														</div>
														Revocalizing...
													</>
												) : (
													`Revocalize`
												)}
											</button>
											{!revocalizeFailed && uploadSuccess && (selectedFile || audioUrl) && audioDuration && (
												<motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mt-3 mb-3 text-[15px] font-[500] text-white">
													{formatTime(audioDuration)} minutes will be deducted from your total minutes left
												</motion.p>
											)}
											{revocalizeFailed && (
												<motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full text-[13px] text-red-600 block">
													{typeof revocalizeFailed === 'boolean' ? "Revocalize failed, please try again." : revocalizeFailed}
												</motion.p>
											)}

											{creditsError && <p className="flex items-center justify-center w-full mb-2 text-2xl text-red-700 text-700">No more credits, please upgrade your plan</p>}
											{(Number(audioDuration) / 60) > (organization?.credits || 0) && !uploading && !loading && <p className="flex items-center justify-center w-full mb-2 text-2xl text-red-700 text-700">You don't have enough credit to convert this audio</p>}
											<p className="w-full text-[13px] text-[#FFFFFF80] block">By pressing Revocalize, you confirm that this is your content and you have the rights to use it.</p>
										</div>
									</div>
								</div>
								<div className="step3 h-full w-full rounded-xl px-6 py-6 lg:py-7 lg:px-7 bg-[#160e26] xl:max-w-[50%] min-w-[50%] ml-0 sm:ml-[13px]">
									<div className="flex items-center mb-[23px]">
										<div className="flex flex-row items-center">
											<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
												<path strokeLinecap="round" strokeLinejoin="round" d="M7.864 4.243A7.5 7.5 0 0119.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 004.5 10.5a7.464 7.464 0 01-1.15 3.993m1.989 3.559A11.209 11.209 0 008.25 10.5a3.75 3.75 0 117.5 0c0 .527-.021 1.049-.064 1.565M12 10.5a14.94 14.94 0 01-3.6 9.75m6.633-4.596a18.666 18.666 0 01-2.485 5.33" />
											</svg>
											<h2 className="text-[20px] font-[700] text-white">View converted voices</h2>
										</div>
										<AnimatePresence>
											{isFetchingConversions && (
												<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
													<RiLoader2Fill className="ml-2 text-lg text-white animate-spin" />
												</motion.div>
											)}
										</AnimatePresence>
									</div>
									<p className="mb-5 text-[15px] text-[#FFFFFF80]">Your latest voice conversions. See your full <a className="text-primary" href="/tasks">Audio History</a> of voice conversions.</p>

									{/* {!isFetchingConversions && audioConversions && !audioConversions.length && ( */}
									{!loading && audioConversions && !audioConversions.length && (
										<div className="py-6 text-center">
											<svg className="mx-auto my-2 scale-110" width="24" height="24" viewBox="0 0 24 24" fill="transparent" xmlns="http://www.w3.org/2000/svg">
												<path
													d="M5 6V6C3.34315 6 2 7.34315 2 9V15C2 16.6569 3.34315 18 5 18V18M19 6V6C20.6569 6 22 7.34315 22 9V15C22 16.6569 20.6569 18 19 18V18M13 15C13 16.1046 12.1046 17 11 17C9.89543 17 9 16.1046 9 15C9 13.8954 9.89543 13 11 13C12.1046 13 13 13.8954 13 15ZM13 15V7L16 9M11.4 22H12.6C14.8402 22 15.9603 22 16.816 21.564C17.5686 21.1805 18.1805 20.5686 18.564 19.816C19 18.9603 19 17.8402 19 15.6V8.4C19 6.15979 19 5.03968 18.564 4.18404C18.1805 3.43139 17.5686 2.81947 16.816 2.43597C15.9603 2 14.8402 2 12.6 2H11.4C9.15979 2 8.03968 2 7.18404 2.43597C6.43139 2.81947 5.81947 3.43139 5.43597 4.18404C5 5.03968 5 6.15979 5 8.4V15.6C5 17.8402 5 18.9603 5.43597 19.816C5.81947 20.5686 6.43139 21.1805 7.18404 21.564C8.03968 22 9.15979 22 11.4 22Z"
													stroke="#FFFFFF80"
													strokeWidth="1.5"
													strokeLinecap="round"
													strokeLinejoin="round"
												/>
											</svg>
											<p className="text-md text-[#FFFFFF80]">No conversions yet</p>
										</div>
									)}

									{/* Loading gradient w */}
									<AnimatePresence>
										{(!taskStatus || (taskStatus?.status == "in_progress" || taskStatus?.status == "waiting") || (taskStatus?.status == "completed" && isFetchingConversions)) && loading && (
											<motion.div className="flex h-[160px] w-full mb-7 flex-col items-center justify-center rounded-[16px] bg-gradient-to-r from-[rgb(255,182,193)] to-[rgb(255,165,0)]" initial={{ opacity: 0, scale: 0.9, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 1.1 }}>
												<div className="animate-spin duration-[1500ms] mt-6">
													<svg fill="none" height="16" stroke="#000" transform="matrix(2 0 0 2 0 0)" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg">
														<path d="m14 8c0 3.3137-2.6863 6-6 6-3.31371 0-6-2.6863-6-6 0-3.31371 2.68629-6 6-6 3.3137 0 6 2.68629 6 6z" opacity=".15" />
														<path d="m14 8c0 3.3137-2.6863 6-6 6-3.31371 0-6-2.6863-6-6 0-3.31371 2.68629-6 6-6" strokeLinecap="round" />
													</svg>
												</div>
												<p className="text-lg font-semibold text-[#000000] mt-2">Revocalizing...</p>
												<p className="text-sm mt-1 text-center text-[#160e26] mb-6">
													{taskStatus?.status == "waiting" && (
														<>
															Your conversion {taskStatus?.place_in_queue ? `is number ${taskStatus?.place_in_queue} in the queue` : "is waiting in the queue"}.
															<br />
														</>
													)}
													This can take up to a few minutes.
													<br className="lg:hidden" /> Hang tight!
													{state.currentPlan?.name === "Free" && (
														<>
															<br />Do you want to convert faster? <Link href={"/plans"} className="underline"> Upgrade your plan</Link>.
														</>
													)}
												</p>
											</motion.div>
										)}
									</AnimatePresence>

									<AnimatePresence>
										<motion.div initial={{ opacity: 0, scale: 0.9, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 1 }}>
											{!loading && !isManuallyFetchingConversions && audioConversions && audioConversions.length > 0 && (
												<WaveformAudioPlayer
													key={`conversion-player-${(audioConversions[0] as any).id}`}
													variant="quinary"
													conversion={audioConversions[0]}
													onModelNameClick={(model: any) => {
														setSearchTerm((model as any)?.name);
														setSelectedModel(model);
													}}
												/>
											)}
										</motion.div>
									</AnimatePresence>

									{/* Dev env-only logs – won't show in production */}
									{process.env.NODE_ENV !== "production" && loading && (
										<pre className="hidden mt-3 text-xs">
											<p className="text-white">Debugging Info</p>
											<p className="text-[#FFFFFF99]">Task ID: {taskId}</p>
											<p className="text-[#FFFFFF99]">Task Status: {JSON.stringify(taskStatus, null, 2)}</p>
										</pre>
									)}

									{audioConversions && audioConversions.length > 1 && (


										<div className="mt-1 rounded-lg bg-[#FFFFFF06]  transition-colors duration-200 hover:text-white">
											<div className="py-5">
												<button
													className="flex flex-row items-center justify-between w-full group"
													onClick={() => {
														if (!shouldLoadAllConversionHistory) setShouldLoadAllConversionHistory(true); // Load all conversion history only once
														setUiStates((prev) => ({ ...prev, isShowingPreviousOutputs: !uiStates.isShowingPreviousOutputs }));
													}}
												>
													<h3 className="ml-5 text-[13px] font-[700] py-1">PREVIOUS CONVERSIONS</h3>

													{uiStates.isShowingPreviousOutputs ? (
														<svg fill="none" height="16" viewBox="0 0 24 24" width="16" xmlns="http://www.w3.org/2000/svg" className="mr-5 transition-transform duration-500 ease-in-out transform scale-125 group-hover:rotate-180">
															<path d="M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
														</svg>
													) : (
														<svg fill="none" height="16" viewBox="0 0 24 24" width="16" xmlns="http://www.w3.org/2000/svg" className="mr-5 transition-transform duration-500 ease-in-out transform scale-125 group-hover:rotate-180">
															<path d="M12 5V19M5 12H19" stroke="currentColor" fillRule="evenodd" clipRule="evenodd" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
														</svg>
													)}
												</button>
												<AnimatePresence initial={false}>
													<div className="overflow-y-auto" style={{ maxHeight: 500 }}>

														{shouldLoadAllConversionHistory &&
															audioConversions &&
															audioConversions.length &&
															audioConversions.slice(1).map((conversion: any, key: any) => (
																<motion.div
																	key={`conversion-wrapper-${conversion.id}`}
																	className="px-5"
																	initial="closed"
																	animate={uiStates.isShowingPreviousOutputs ? "open" : "closed"}
																	variants={{
																		open: { opacity: 1, height: "auto" },
																		closed: { opacity: 0, height: 0 },
																	}}
																	transition={{ duration: 0.25 }}
																>
																	<WaveformAudioPlayer
																		key={`conversion-player-${conversion.id}`}
																		variant="quinary"
																		conversion={conversion}
																		onModelNameClick={(model: any) => {
																			setSearchTerm((model as any)?.name);
																			setSelectedModel(model);
																		}}
																	/>
																	{uiStates.isShowingPreviousOutputs && key === audioConversions.length - 2 && <div key={`conversion-divider-${conversion.id}`} className="inline-flex mb-5"></div>}
																</motion.div>
															))}
													</div>
												</AnimatePresence>
											</div>
										</div>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</AppContainer>
	);
}